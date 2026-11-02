"""Transactional, dependency-free retail event ingestion and inventory reconciliation."""

import argparse
import csv
import hashlib
import json
import sqlite3
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path

CHANNELS = {"shopify", "amazon", "pos"}
TYPES = {"sale", "cancel", "return_restock"}


def connect(db_path):
    path = Path(db_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    conn.execute("PRAGMA busy_timeout = 5000")
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS inventory (
            sku TEXT PRIMARY KEY,
            opening_qty INTEGER NOT NULL CHECK (opening_qty >= 0)
        );
        CREATE TABLE IF NOT EXISTS events (
            event_id TEXT PRIMARY KEY,
            source TEXT NOT NULL,
            order_id TEXT NOT NULL,
            sku TEXT NOT NULL REFERENCES inventory(sku),
            event_type TEXT NOT NULL,
            quantity INTEGER NOT NULL CHECK (quantity > 0),
            occurred_at TEXT NOT NULL,
            fingerprint TEXT NOT NULL
        );
        CREATE INDEX IF NOT EXISTS ix_events_order_line
            ON events(source, order_id, sku);
        CREATE TABLE IF NOT EXISTS rejections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            run_id TEXT NOT NULL,
            event_id TEXT,
            reason TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS ingest_runs (
            run_id TEXT PRIMARY KEY,
            ingested_at TEXT NOT NULL,
            inserted INTEGER NOT NULL,
            duplicates INTEGER NOT NULL,
            rejected INTEGER NOT NULL
        );
    """)
    return conn


def load_inventory(conn, csv_path):
    """Opening balances are immutable; repeated initialization must match exactly."""
    with open(csv_path, newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames != ["sku", "opening_qty"]:
            raise ValueError("inventory CSV must have sku,opening_qty columns")
        records = list(reader)
    if not records:
        raise ValueError("inventory CSV is empty")
    rows = []
    for record in records:
        sku = record["sku"].strip()
        try:
            count = int(record["opening_qty"])
        except (TypeError, ValueError) as exc:
            raise ValueError("opening_qty must be an integer") from exc
        if not sku or count < 0 or str(count) != record["opening_qty"].strip():
            raise ValueError("invalid SKU or opening_qty")
        rows.append((sku, count))
    if len({sku for sku, _ in rows}) != len(rows):
        raise ValueError("duplicate SKUs in inventory CSV")
    existing = [(r["sku"], r["opening_qty"]) for r in conn.execute(
        "SELECT sku, opening_qty FROM inventory ORDER BY sku")]
    if existing:
        if existing != sorted(rows):
            raise ValueError("inventory already initialized with different balances")
        return 0
    with conn:
        conn.executemany("INSERT INTO inventory(sku, opening_qty) VALUES (?, ?)", rows)
    return len(rows)


def normalize(raw, known_skus):
    if not isinstance(raw, dict):
        raise ValueError("event must be a JSON object")
    fields = ("event_id", "source", "order_id", "sku", "event_type", "quantity", "occurred_at")
    if any(field not in raw for field in fields):
        raise ValueError("missing required event field")
    event = {}
    for field in ("event_id", "source", "order_id", "sku", "event_type"):
        value = raw[field]
        if not isinstance(value, str) or not value.strip() or len(value) > 100:
            raise ValueError(f"invalid {field}")
        event[field] = value.strip()
    if event["source"] not in CHANNELS:
        raise ValueError("unsupported source")
    if event["event_type"] not in TYPES:
        raise ValueError("unsupported event type")
    if event["sku"] not in known_skus:
        raise ValueError("unknown SKU")
    quantity = raw["quantity"]
    if type(quantity) is not int or quantity <= 0:
        raise ValueError("quantity must be a positive integer")
    event["quantity"] = quantity
    if not isinstance(raw["occurred_at"], str):
        raise ValueError("occurred_at must be a timestamp")
    try:
        timestamp = datetime.fromisoformat(raw["occurred_at"].replace("Z", "+00:00"))
    except ValueError as exc:
        raise ValueError("invalid occurred_at timestamp") from exc
    if timestamp.tzinfo is None or timestamp.utcoffset() is None:
        raise ValueError("occurred_at must include a timezone")
    event["occurred_at"] = timestamp.astimezone(timezone.utc).isoformat()
    return event


def fingerprint(event):
    content = json.dumps(event, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(content.encode("utf-8")).hexdigest()


def ingest(conn, events_path):
    """Atomic batch insert with replay detection and invalid-record quarantine."""
    known_skus = {row[0] for row in conn.execute("SELECT sku FROM inventory")}
    if not known_skus:
        raise ValueError("initialize inventory before ingestion")
    run_id = str(uuid.uuid4())
    counts = {"inserted": 0, "duplicates": 0, "rejected": 0}
    with open(events_path, encoding="utf-8") as handle:
        conn.execute("BEGIN IMMEDIATE")
        try:
            for line in handle:
                if not line.strip():
                    continue
                raw = None
                try:
                    raw = json.loads(line)
                    event = normalize(raw, known_skus)
                    digest = fingerprint(event)
                    previous = conn.execute(
                        "SELECT fingerprint FROM events WHERE event_id = ?",
                        (event["event_id"],),
                    ).fetchone()
                    if previous is not None:
                        if previous["fingerprint"] == digest:
                            counts["duplicates"] += 1
                            continue
                        raise ValueError("conflicting event_id payload")
                    conn.execute("""
                        INSERT INTO events(event_id, source, order_id, sku,
                                           event_type, quantity, occurred_at, fingerprint)
                        VALUES (:event_id, :source, :order_id, :sku, :event_type,
                                :quantity, :occurred_at, :fingerprint)
                    """, {**event, "fingerprint": digest})
                    counts["inserted"] += 1
                except (ValueError, TypeError) as exc:
                    event_id = raw.get("event_id") if isinstance(raw, dict) else None
                    if not isinstance(event_id, str):
                        event_id = None
                    conn.execute(
                        "INSERT INTO rejections(run_id, event_id, reason) VALUES (?, ?, ?)",
                        (run_id, event_id, str(exc)),
                    )
                    counts["rejected"] += 1
            conn.execute("""
                INSERT INTO ingest_runs(run_id, ingested_at, inserted, duplicates, rejected)
                VALUES (?, ?, ?, ?, ?)
            """, (run_id, datetime.now(timezone.utc).isoformat(),
                  counts["inserted"], counts["duplicates"], counts["rejected"]))
            conn.commit()
        except Exception:
            conn.rollback()
            raise
    return {"run_id": run_id, **counts, "summary": summarize(conn)}


def summarize(conn):
    balances = [dict(row) for row in conn.execute("""
        SELECT i.sku, i.opening_qty,
            COALESCE(SUM(CASE WHEN e.event_type = 'sale' THEN e.quantity ELSE 0 END), 0) AS sold,
            COALESCE(SUM(CASE WHEN e.event_type = 'cancel' THEN e.quantity ELSE 0 END), 0) AS cancelled,
            COALESCE(SUM(CASE WHEN e.event_type = 'return_restock' THEN e.quantity ELSE 0 END), 0) AS restocked,
            i.opening_qty - COALESCE(SUM(CASE
                WHEN e.event_type = 'sale' THEN e.quantity
                WHEN e.event_type IN ('cancel', 'return_restock') THEN -e.quantity
                ELSE 0 END), 0) AS expected_on_hand
        FROM inventory i LEFT JOIN events e ON i.sku = e.sku
        GROUP BY i.sku, i.opening_qty ORDER BY i.sku
    """)]
    order_anomalies = [dict(row) for row in conn.execute("""
        SELECT source, order_id, sku,
            SUM(CASE WHEN event_type = 'sale' THEN quantity ELSE 0 END) AS sold,
            SUM(CASE WHEN event_type = 'cancel' THEN quantity ELSE 0 END) AS cancelled,
            SUM(CASE WHEN event_type = 'return_restock' THEN quantity ELSE 0 END) AS restocked
        FROM events GROUP BY source, order_id, sku
        HAVING cancelled > sold OR restocked > (sold - cancelled)
        ORDER BY source, order_id, sku
    """)]
    negative_stock = [row["sku"] for row in balances if row["expected_on_hand"] < 0]
    return {"balances": balances, "order_anomalies": order_anomalies,
            "negative_stock_skus": negative_stock,
            "has_alerts": bool(order_anomalies or negative_stock)}


def reconcile(conn, counts_path):
    expected = {x["sku"]: x["expected_on_hand"] for x in summarize(conn)["balances"]}
    with open(counts_path, newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames != ["sku", "counted_qty"]:
            raise ValueError("WMS counts must have sku,counted_qty columns")
        actual = {}
        for row in reader:
            sku = row["sku"].strip()
            try:
                count = int(row["counted_qty"])
            except (TypeError, ValueError) as exc:
                raise ValueError("invalid counted_qty") from exc
            if not sku or sku in actual or count < 0 or str(count) != row["counted_qty"].strip():
                raise ValueError("duplicate SKU or invalid WMS count")
            actual[sku] = count
    mismatches = [
        {"sku": sku, "expected": expected[sku],
         "counted": actual[sku], "variance": actual[sku] - expected[sku]}
        for sku in sorted(expected.keys() & actual.keys()) if actual[sku] != expected[sku]
    ]
    missing = sorted(expected.keys() - actual.keys())
    unexpected = sorted(actual.keys() - expected.keys())
    return {"mismatches": mismatches, "missing_skus": missing,
            "unexpected_skus": unexpected,
            "has_alerts": bool(mismatches or missing or unexpected)}


def main(argv=None):
    parser = argparse.ArgumentParser(description="Order event ledger and stock reconciliation")
    parser.add_argument("--db", default="commerce.sqlite3")
    actions = parser.add_subparsers(dest="command", required=True)
    init = actions.add_parser("init")
    init.add_argument("--inventory", required=True)
    load = actions.add_parser("ingest")
    load.add_argument("--events", required=True)
    actions.add_parser("summary")
    check = actions.add_parser("reconcile")
    check.add_argument("--counts", required=True)
    args = parser.parse_args(argv)
    try:
        with connect(args.db) as conn:
            if args.command == "init":
                result = {"initialized_skus": load_inventory(conn, args.inventory)}
            elif args.command == "ingest":
                result = ingest(conn, args.events)
            elif args.command == "summary":
                result = summarize(conn)
            else:
                result = reconcile(conn, args.counts)
        print(json.dumps(result, indent=2))
        return 2 if result.get("has_alerts") else 0
    except (OSError, ValueError, sqlite3.Error) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
