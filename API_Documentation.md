# 📡 API Documentation

**Base URL:** `http://localhost:5000`  
**Content-Type:** `application/json`

---

## Table of Contents

- [Orders](#orders)
  - [Create Order](#1-create-order)
  - [Get Orders](#2-get-orders)
  - [Update Order Status](#3-update-order-status)
- [Archival](#archival)
  - [Archive Old Orders](#4-archive-old-orders)
- [Analytics](#analytics)
  - [Orders Per Day](#5-orders-per-day)
  - [Revenue Per Store](#6-revenue-per-store)
  - [Top Selling Items](#7-top-selling-items)
- [WebSocket Events](#websocket-events)
- [Error Responses](#error-responses)

---

## Orders

### 1. Create Order

Creates a new order for a store.

```
POST /orders
```

**Request Body**

| Field | Type | Required | Description |
|---|---|---|---|
| `store_id` | string | ✅ | Unique store identifier |
| `items` | array | ✅ | Array of order items (min 1) |
| `items[].item_id` | string | ✅ | Unique item identifier |
| `items[].qty` | number | ✅ | Quantity (min 1) |
| `total_amount` | number | ✅ | Total order amount (must be positive) |

**Example Request**
```json
{
  "store_id": "store_1",
  "items": [
    { "item_id": "item_1", "qty": 2 },
    { "item_id": "item_2", "qty": 1 }
  ],
  "total_amount": 499
}
```

**Example Response** `201 Created`
```json
{
  "_id": "6a2588026214a0cad62044857",
  "store_id": "store_1",
  "items": [
    { "item_id": "item_1", "qty": 2 },
    { "item_id": "item_2", "qty": 1 }
  ],
  "total_amount": 499,
  "status": "PLACED",
  "created_at": "2026-06-08T18:13:52.000Z",
  "__v": 0
}
```

**Validation Errors** `400 Bad Request`
```json
{
  "message": "Validation failed",
  "errors": [
    { "field": "items", "message": "At least one item is required" },
    { "field": "total_amount", "message": "total_amount must be positive" }
  ]
}
```

---

### 2. Get Orders

Fetch orders filtered by store with pagination.

```
GET /orders
```

**Query Parameters**

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `store_id` | string | ❌ | — | Filter by store ID |
| `page` | number | ❌ | `1` | Page number |
| `limit` | number | ❌ | `10` | Results per page(default 10) |

**Example Request**
```
GET /orders?store_id=store_1&page=1&limit=10
```

**Example Response** `200 OK`
```json
{
  "data": [
    {
      "_id": "6a2588026214a0cad62044857",
      "store_id": "store_1",
      "items": [
        { "item_id": "item_1", "qty": 2 }
      ],
      "total_amount": 499,
      "status": "PLACED",
      "created_at": "2026-06-08T18:13:52.000Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

---

### 3. Update Order Status

Update the status of an existing order.

```
PATCH /orders/:id/status
```

**URL Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | ✅ | MongoDB ObjectId of the order |

**Request Body**

| Field | Type | Required | Description |
|---|---|---|---|
| `status` | string | ✅ | One of: `PLACED`, `PREPARING`, `COMPLETED` |

**Example Request**
```
PATCH /orders/6a2588026214a0cad62044857/status
```
```json
{
  "status": "PREPARING"
}
```

**Example Response** `200 OK`
```json
{
  "_id": "6a2588026214a0cad62044857",
  "store_id": "store_1",
  "items": [
    { "item_id": "item_1", "qty": 2 }
  ],
  "total_amount": 499,
  "status": "PREPARING",
  "created_at": "2026-06-08T18:13:52.000Z"
}
```

**Validation Error** `400 Bad Request`
```json
{
  "message": "Validation failed",
  "errors": [
    { "field": "status", "message": "status must be PLACED, PREPARING or COMPLETED" }
  ]
}
```

**Not Found** `404 Not Found`
```json
{
  "message": "Order not found"
}
```

---

## Archival

### 4. Archive Old Orders

Moves all orders older than 30 days from the `orders` collection to the `orders_archive` collection.

```
POST /archive-old-orders
```

**Request Body**

None required.

**Example Response** `200 OK`
```json
{
  "message": "Archival complete",
  "archived": 42
}
```

**No Orders to Archive**
```json
{
  "message": "No orders to archive",
  "archived": 0
}
```

> **Note:** Archived orders are stored in the `orders_archive` collection with an additional `archived_at` timestamp field.

---

## Analytics

### 5. Orders Per Day

Returns the number of orders and total revenue grouped by day for the last 30 days.

```
GET /analytics/orders-per-day
```

**Query Parameters**

None.

**Example Response** `200 OK`
```json
[
  {
    "_id": "2026-06-08",
    "count": 12,
    "revenue": 5880
  },
  {
    "_id": "2026-06-07",
    "count": 8,
    "revenue": 3920
  }
]
```

| Field | Type | Description |
|---|---|---|
| `_id` | string | Date in `YYYY-MM-DD` format |
| `count` | number | Number of orders on that day |
| `revenue` | number | Total revenue on that day |

---

### 6. Revenue Per Store

Returns total revenue, order count, and average order value grouped by store, sorted by revenue descending.

```
GET /analytics/revenue-per-store
```

**Query Parameters**

None.

**Example Response** `200 OK`
```json
[
  {
    "_id": "store_1",
    "total_revenue": 24500,
    "total_orders": 49,
    "avg_order_value": 500
  },
  {
    "_id": "store_palak",
    "total_revenue": 18200,
    "total_orders": 36,
    "avg_order_value": 505.5
  }
]
```

| Field | Type | Description |
|---|---|---|
| `_id` | string | Store ID |
| `total_revenue` | number | Sum of all order amounts |
| `total_orders` | number | Total number of orders |
| `avg_order_value` | number | Average order value |

---

### 7. Top Selling Items

Returns the top 5 items by total quantity sold across all orders.

```
GET /analytics/top-items
```

**Query Parameters**

None.

**Example Response** `200 OK`
```json
[
  {
    "item_id": "item_1",
    "total_qty": 120,
    "total_orders": 60
  },
  {
    "item_id": "item_2",
    "total_qty": 95,
    "total_orders": 48
  },
  {
    "item_id": "item_3",
    "total_qty": 80,
    "total_orders": 40
  },
  {
    "item_id": "item_4",
    "total_qty": 60,
    "total_orders": 30
  },
  {
    "item_id": "item_5",
    "total_qty": 45,
    "total_orders": 22
  }
]
```

| Field | Type | Description |
|---|---|---|
| `item_id` | string | Item identifier |
| `total_qty` | number | Total quantity sold |
| `total_orders` | number | Number of orders containing this item |

---

## WebSocket Events

**Connection URL:** `http://localhost:5000`

### Client → Server

#### `join:store`
Join a store-specific room to receive only that store's events.

```js
socket.emit("join:store", "store_1");
```

| Parameter | Type | Description |
|---|---|---|
| `storeId` | string | Store ID to subscribe to |

---

### Server → Client

#### `order:created`
Emitted to all clients when a new order is created.

```json
{
  "_id": "6a2588026214a0cad62044857",
  "store_id": "store_1",
  "items": [{ "item_id": "item_1", "qty": 2 }],
  "total_amount": 499,
  "status": "PLACED",
  "created_at": "2026-06-08T18:13:52.000Z"
}
```

#### `order:updated`
Emitted to all clients when an order status is updated.

```json
{
  "_id": "6a2588026214a0cad62044857",
  "status": "PREPARING"
}
```

---

## Error Responses

All endpoints return consistent error responses.

### 400 Bad Request
Returned when request body fails validation.
```json
{
  "message": "Validation failed",
  "errors": [
    { "field": "store_id", "message": "store_id is required" }
  ]
}
```

### 404 Not Found
Returned when a resource doesn't exist.
```json
{
  "message": "Order not found"
}
```

### 500 Internal Server Error
Returned on unexpected server errors.
```json
{
  "message": "Internal Server Error"
}
```