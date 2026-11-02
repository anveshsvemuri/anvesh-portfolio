# Commerce Reconciliation & Inventory Ledger

[![Commerce CI](https://github.com/anveshsvemuri/anvesh-portfolio/actions/workflows/commerce-reconciliation.yml/badge.svg)](https://github.com/anveshsvemuri/anvesh-portfolio/actions/workflows/commerce-reconciliation.yml)

A **runnable, dependency-free data engineering reference project** for reconciling orders from Shopify-like, Amazon-like, and POS feeds against a warehouse inventory snapshot. All records are synthetic. This is *not* a production Shopify/Amazon integration and does not require cloud accounts or credentials.

## Why this problem matters

Multi-channel retail systems deliver replayed, late and sometimes contradictory updates. A naive SUM of order rows double-counts inventory movements, and an OMS/WMS count may disagree with computed inventory. This project demonstrates the operational contracts needed to make those discrepancies visible.

### Data flow

~~~text
Synthetic channel events (JSONL)    Opening balances (CSV)
             |                               |
             v                               v
     Contract validation                 SKU catalog
             |
        transactional ingest
             |
        +----+--------------------+
        |                         |
   Unique event ledger     Rejected-event audit
        |
    SQL inventory rollup
        |
    Order-line anomaly detection
        |
    WMS inventory snapshot (CSV)
        |
    Variance + missing-SKU report
~~~

## Demonstrated capabilities

- **Idempotent ingestion:** one row per event ID; exact replays skipped, contradictory payloads quarantined.
- **Atomic batches:** SQLite transaction covers events, rejection reasons and run-level audit counters.
- **Data contracts:** supported channels/types, known SKUs, positive integer quantities and timezone-aware timestamps.
- **Out-of-order tolerance:** a cancellation may arrive before its sale; the derived order anomaly clears once the sale arrives.
- **Stock reconciliation:** compare expected inventory against independent WMS counts; surface per-SKU variance, missing, and unexpected SKUs.
- **Operational checks:** warn when cancellation/return quantities exceed sales or when aggregate stock goes negative.
- **Local SQL analytics:** per-source sold, cancelled and returned-to-stock units.
- **Automated tests:** 7 standard-library tests running in GitHub Actions with no external credentials.

## Try it (Python 3.10+)

Run from this directory:

~~~bash
python commerce_reconcile.py --db demo.sqlite3 init --inventory samples/initial_inventory.csv
python commerce_reconcile.py --db demo.sqlite3 ingest --events samples/events.jsonl
python commerce_reconcile.py --db demo.sqlite3 summary
python commerce_reconcile.py --db demo.sqlite3 reconcile --counts samples/wms_counts.csv
python -m unittest discover -s tests -v
~~~

The synthetic sample produces **7 inserted events**, **1 ignored duplicate**, and **0 invalid rows**. Derived balances are BKT-TR100 = 22, BKT-AG200 = 15, TUBE-15 = 9. The supplied WMS snapshot intentionally reports BKT-AG200 = 14, so reconciliation emits a **-1 inventory variance**, sets `has_alerts: true`, and exits with status **2**. Status 1 means CLI/input error, 0 means successful execution without reconciliation alerts.

**Important:** event quantities represent distinct quantity changes, not full order-state snapshots. `return_restock` is a confirmed return to sellable inventory, not an automatically inferred refund. Because events are immutable, corrections use new adjustment events rather than changing historical events. Temporary order anomalies may occur while events arrive out of order.

### Source contract

~~~json
{"event_id":"evt-001","source":"shopify","order_id":"S-1001","sku":"BKT-TR100","event_type":"sale","quantity":3,"occurred_at":"2026-10-01T10:01:00Z"}
~~~

- `source`: shopify, amazon, pos
- `event_type`: sale, cancel, return_restock
- event IDs are globally unique across feeds
- timestamps must include a timezone; all are normalized to UTC before hashing
- reopening the same DB preserves the event ledger and replay protection
- do not initialize an existing ledger with a different opening inventory

## What's implemented vs. next

**Implemented:** local SQLite event ledger, validations, idempotent replay handling, audit counts, SQL reporting, WMS snapshot comparison, tests, CI.

**Potential extensions:** authenticated API adapters with pagination/rate limits, Kafka or Kinesis transport, CDC-style source offsets, Delta/Databricks deployment, retry queues, and alert routing. No hosted deployment or real marketplace connection is claimed.

## Repository context

This project lives under the public portfolio repository because repository-creation controls are not exposed through the current integration. It is self-contained, and the same source can be moved unchanged into a dedicated GitHub repository later.

**Author:** Anvesh Sai Vemuri — Data Engineering portfolio.
