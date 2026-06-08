import express from "express";
import {
  archiveOldOrders,
  ordersPerDay,
  revenuePerStore,
  topItems
} from "../controllers/analytics.js";

const router = express.Router();

router.post("/archive-old-orders", archiveOldOrders);
router.get("/analytics/orders-per-day", ordersPerDay);
router.get("/analytics/revenue-per-store", revenuePerStore);
router.get("/analytics/top-items", topItems);

export default router;