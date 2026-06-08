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

export type AnalyticsOrdersPerDay = {
  _id: string;
  count: number;
  revenue: number;
};

export type AnalyticsRevenuePerStore = {
  _id: string;
  total_revenue: number;
  total_orders: number;
  avg_order_value: number;
};

export type AnalyticsTopItem = {
  item_id: string;
  total_qty: number;
  total_orders: number;
};