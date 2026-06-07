import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (payload: {
      store_id: string;
      items: { item_id: string; qty: number }[];
      total_amount: number;
    }) => {
      const { data } = await api.post("/orders", payload);
      return data;
    },
  });
};