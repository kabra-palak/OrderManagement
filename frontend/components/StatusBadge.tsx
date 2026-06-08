import { OrderStatus } from "@/types";

const colorMap: Record<OrderStatus, { badge: string; dot: string }> = {
  PLACED:    { badge: "bg-amber-50  text-amber-700  border-amber-200",  dot: "bg-amber-400"  },
  PREPARING: { badge: "bg-blue-50   text-blue-700   border-blue-200",   dot: "bg-blue-400"   },
  COMPLETED: { badge: "bg-green-50  text-green-700  border-green-200",  dot: "bg-green-400"  },
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const { badge, dot } = colorMap[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}