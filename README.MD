# 🛒 Multi-Store Order Management System

A full-stack order management system supporting multiple stores with real-time updates and data analytics.
## Live Demo

- Frontend: https://order-management-neon-five.vercel.app/
- Backend: https://ordermanagement-tom7.onrender.com
- Repository: https://github.com/kabra-palak/OrderManagement

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| State Management | Zustand, React Query (TanStack) |
| Backend | Node.js, Express |
| Database | MongoDB (Atlas) |
| ORM | Mongoose |
| Real-time | Socket.IO |
| Validation | Zod |

---

## 📁 Project Structure

```
OrderManagement/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── order.controller.js
│   │   │   └── analytics.controller.js
│   │   ├── models/
│   │   │   ├── order.model.js
│   │   │   └── orderArchive.model.js
│   │   ├── routes/
│   │   │   ├── order.routes.js
│   │   │   └── analytics.routes.js
│   │   ├── middleware/
│   │   │   └── validate.js
│   │   ├── validators/
│   │   │   └── order.validator.js
│   │   └── socket.js
│   ├── db.js
│   ├── index.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── create-order/page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── StatusBadge.tsx
│   │   └── Pagination.tsx
│   ├── hooks/
│   │   ├── useOrders.ts
│   │   ├── useCreateOrder.ts
│   │   ├── useUpdateStatus.ts
│   │   └── useSocket.ts
│   ├── lib/
│   │   ├── axios.ts
│   │   ├── queryClient.ts
│   │   └── socket.ts
│   ├── store/
│   │   └── useStoreFilter.ts
│   ├── types/
│   │   └── order.ts
│   ├── .env.local
│   └── package.json
```

---

## ⚙️ Prerequisites

- Node.js v18+
- npm v9+
- MongoDB Atlas account (or local MongoDB)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kabra-palak/OrderManagement.git
cd OrderManagement
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

> **MongoDB Atlas URI format:**
> `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority`

Start the backend:

```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the `frontend/` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at `http://localhost:3000`

---

## 📡 API Reference

### Orders

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/orders` | Create a new order |
| `GET` | `/orders?store_id=&page=&limit=` | Get orders by store (paginated) |
| `PATCH` | `/orders/:id/status` | Update order status |

### Analytics & Archival

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/archive-old-orders` | Archive orders older than 30 days |
| `GET` | `/analytics/orders-per-day` | Orders and revenue grouped by day |
| `GET` | `/analytics/revenue-per-store` | Total revenue per store |
| `GET` | `/analytics/top-items` | Top 5 selling items by quantity |


---

## ⚡ Real-Time Events (Socket.IO)

| Event | Direction | Payload |
|---|---|---|
| `join:store` | Client → Server | `storeId: string` |
| `order:created` | Server → Client | full order object |
| `order:updated` | Server → Client | `{ _id, status }` |

Clients can join a store-specific room to receive only relevant events:
```js
socket.emit("join:store", "store_1");
```

---

## 🗄️ Database Schema

```
Order {
  _id          ObjectId
  store_id     String    [indexed]
  items        [{ item_id: String, qty: Number }]
  total_amount Number
  status       PLACED | PREPARING | COMPLETED
  created_at   Date      [indexed]
}

OrderArchive {
  ...same as Order
  archived_at  Date
}
```

---

## 🌐 Pages

| Route | Description |
|---|---|
| `/` | Home page |
| `/create-order` | Create a new order |
| `/orders` | List orders with store filter and pagination |
| `/orders/[id]` | Update order status |