import express from "express";
import { createOrder, getOrders, updateStatus } from "../controllers/order.js";
import { validate } from "../middleware/validate.js";
import { createOrderSchema, updateStatusSchema } from "../validators/validator.js";

const router = express.Router();

router.post("/", validate(createOrderSchema), createOrder);
router.get("/", getOrders);
router.patch("/:id/status", validate(updateStatusSchema), updateStatus);

export default router;