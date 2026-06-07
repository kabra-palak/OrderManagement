import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { OrdersResponse } from "@/types";

export const useOrders = (storeId: string, page: number) => {
  return useQuery<OrdersResponse>({
    queryKey: ["orders", storeId, page],
    queryFn: async () => {
      const { data } = await api.get("/orders", {
        params: { store_id: storeId || undefined, page, limit: 10 },
      });
      return data;
    },
  });
};