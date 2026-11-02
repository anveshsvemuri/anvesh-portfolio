import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from commerce_reconcile import connect, ingest, load_inventory, normalize, reconcile, summarize


class ReconciliationTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.db = connect(self.root / "ledger.sqlite3")
        self.addCleanup(self.db.close)
        path = self.root / "inventory.csv"
        path.write_text("sku,opening_qty\nSKU-1,10\nSKU-2,3\n", encoding="utf-8")
        self.assertEqual(load_inventory(self.db, path), 2)
        self.assertEqual(load_inventory(self.db, path), 0)

    def event(self, event_id, kind="sale", qty=2):
        return {"event_id": event_id, "source": "shopify", "order_id": "O-1",
                "sku": "SKU-1", "event_type": kind, "quantity": qty,
                "occurred_at": "2026-10-01T10:00:00Z"}

    def feed(self, *records):
        path = self.root / "events.jsonl"
        path.write_text("\n".join(
            json.dumps(x) if isinstance(x, dict) else x for x in records
        ) + "\n", encoding="utf-8")
        return ingest(self.db, path)

    def test_replay_and_conflict(self):
        value = self.event("a")
        self.assertEqual(self.feed(value, value)["inserted"], 1)
        result = self.feed(value, {**value, "quantity": 4})
        self.assertEqual((result["duplicates"], result["rejected"]), (1, 1))
        self.assertEqual(summarize(self.db)["balances"][0]["expected_on_hand"], 8)

    def test_out_of_order_cancel(self):
        self.assertTrue(self.feed(self.event("c", "cancel", 1))["summary"]["has_alerts"])
        self.feed(self.event("s", "sale", 2))
        self.assertFalse(summarize(self.db)["has_alerts"])
        self.assertEqual(summarize(self.db)["balances"][0]["expected_on_hand"], 9)

    def test_negative_stock_and_excess_restock(self):
        self.feed(self.event("s", "sale", 11), self.event("r", "return_restock", 12))
        self.assertTrue(summarize(self.db)["order_anomalies"])
        self.feed(self.event("s2", "sale", 20))
        self.assertIn("SKU-1", summarize(self.db)["negative_stock_skus"])

    def test_invalid_records_quarantined(self):
        result = self.feed(self.event("bad", qty=-1),
                           {**self.event("unknown"), "sku": "MISSING"}, "not json")
        self.assertEqual((result["inserted"], result["rejected"]), (0, 3))

    def test_reconciliation_variance_and_missing(self):
        self.feed(self.event("s", "sale", 2))
        path = self.root / "count.csv"
        path.write_text("sku,counted_qty\nSKU-1,7\nUNKNOWN,1\n", encoding="utf-8")
        result = reconcile(self.db, path)
        self.assertEqual(result["mismatches"][0]["variance"], -1)
        self.assertEqual(result["missing_skus"], ["SKU-2"])
        self.assertEqual(result["unexpected_skus"], ["UNKNOWN"])

    def test_timezone_canonicalization(self):
        a = self.event("a")
        b = {**a, "occurred_at": "2026-10-01T06:00:00-04:00"}
        result = self.feed(a, b)
        self.assertEqual((result["inserted"], result["duplicates"]), (1, 1))
        with self.assertRaises(ValueError):
            normalize({**a, "occurred_at": "2026-10-01T10:00:00"}, {"SKU-1"})

    def test_immutable_catalog(self):
        path = self.root / "inventory.csv"
        path.write_text("sku,opening_qty\nSKU-1,999\n", encoding="utf-8")
        with self.assertRaises(ValueError):
            load_inventory(self.db, path)


if __name__ == "__main__":
    unittest.main()
