import { z } from "zod";

export const createOrderSchema = z.object({
  store_id: z.string().min(1, "store_id is required"),
  items: z
    .array(
      z.object({
        item_id: z.string().min(1, "item_id is required"),
        qty: z.number().int().min(1, "qty must be at least 1"),
      })
    )
    .min(1, "At least one item is required"),
  total_amount: z.number().positive("total_amount must be positive"),
});

export const updateStatusSchema = z.object({
  status: z.enum(["PLACED", "PREPARING", "COMPLETED"], {
    errorMap: () => ({ message: "status must be PLACED, PREPARING or COMPLETED" }),
  }),
});