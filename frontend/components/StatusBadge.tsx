import { OrderStatus } from "@/types";

const colorMap: Record<OrderStatus, string> = {
  PLACED: "bg-yellow-100 text-yellow-800",
  PREPARING: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colorMap[status]}`}>
      {status}
    </span>
  );
}