-- Channel/SKU operational units: events are unique on event_id.
SELECT source, sku,
    SUM(CASE WHEN event_type = 'sale' THEN quantity ELSE 0 END) AS sold_units,
    SUM(CASE WHEN event_type = 'cancel' THEN quantity ELSE 0 END) AS cancelled_units,
    SUM(CASE WHEN event_type = 'return_restock' THEN quantity ELSE 0 END) AS returned_to_stock_units,
    SUM(CASE WHEN event_type = 'sale' THEN quantity ELSE -quantity END) AS net_inventory_outflow
FROM events
GROUP BY source, sku ORDER BY source, sku;

-- Order-line anomalies, including unresolved out-of-order cancellations.
SELECT source, order_id, sku,
    SUM(CASE WHEN event_type = 'sale' THEN quantity ELSE 0 END) AS sold,
    SUM(CASE WHEN event_type = 'cancel' THEN quantity ELSE 0 END) AS cancelled,
    SUM(CASE WHEN event_type = 'return_restock' THEN quantity ELSE 0 END) AS restocked
FROM events GROUP BY source, order_id, sku
HAVING cancelled > sold OR restocked > (sold - cancelled);
