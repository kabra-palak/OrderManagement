import express from "express";
import { createOrder, getOrders, updateStatus } from "../controllers/order.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.patch("/:id/status", updateStatus);

export default router;