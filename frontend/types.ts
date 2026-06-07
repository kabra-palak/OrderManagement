export type OrderStatus = "PLACED" | "PREPARING" | "COMPLETED";

export interface OrderItem {
  item_id: string;
  qty: number;
}

export interface Order {
  _id: string;
  store_id: string;
  items: OrderItem[];
  total_amount: number;
  status: OrderStatus;
  created_at: string;
}

export interface OrdersResponse {
  data: Order[];
  total: number;
  page: number;
  limit: number;
}