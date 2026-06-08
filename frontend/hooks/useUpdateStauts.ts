import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { queryClient } from "@/lib/queryClient";
import { OrderStatus } from "@/types";

export const useUpdateStatus = () => {
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => {
      const { data } = await api.patch(`/orders/${id}/status`, { status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};