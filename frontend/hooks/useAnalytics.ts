import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { AnalyticsOrdersPerDay, AnalyticsRevenuePerStore, AnalyticsTopItem } from "@/types";

export const useOrdersPerDay = () =>
  useQuery<AnalyticsOrdersPerDay[]>({
    queryKey: ["analytics", "ordersPerDay"],
    queryFn: async () => {
      const { data } = await api.get("/analytics/orders-per-day");
      return data;
    },
  });

export const useRevenuePerStore = () =>
  useQuery<AnalyticsRevenuePerStore[]>({
    queryKey: ["analytics", "revenuePerStore"],
    queryFn: async () => {
      const { data } = await api.get("/analytics/revenue-per-store");
      return data;
    },
  });

export const useTopItems = () =>
  useQuery<AnalyticsTopItem[]>({
    queryKey: ["analytics", "topItems"],
    queryFn: async () => {
      const { data } = await api.get("/analytics/top-items");
      return data;
    },
  });
