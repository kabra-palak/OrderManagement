import Order from "../models/order.js";
import OrderArchive from "../models/orderArchive.js";

// POST /archive-old-orders
export const archiveOldOrders = async (req, res, next) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Find old orders
    const oldOrders = await Order.find({ created_at: { $lt: thirtyDaysAgo } }).lean();

    if (oldOrders.length === 0) {
      return res.json({ message: "No orders to archive", archived: 0 });
    }

    // Add archived_at timestamp
    const toArchive = oldOrders.map((o) => ({ ...o, archived_at: new Date() }));

    // Bulk insert into archive
    await OrderArchive.insertMany(toArchive, { ordered: false });

    // Delete from orders
    const ids = oldOrders.map((o) => o._id);
    await Order.deleteMany({ _id: { $in: ids } });

    res.json({ message: "Archival complete", archived: oldOrders.length });
  } catch (err) {
    next(err);
  }
};

// GET /analytics/orders-per-day
export const ordersPerDay = async (req, res, next) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$created_at", timezone: "Asia/Kolkata" }
          },
          count: { $sum: 1 },
          revenue: { $sum: "$total_amount" }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 30 } // last 30 days
    ]);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

// GET /analytics/revenue-per-store
export const revenuePerStore = async (req, res, next) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: "$store_id",
          total_revenue: { $sum: "$total_amount" },
          total_orders: { $sum: 1 },
          avg_order_value: { $avg: "$total_amount" }
        }
      },
      { $sort: { total_revenue: -1 } }
    ]);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

// GET /analytics/top-items
export const topItems = async (req, res, next) => {
  try {
    const result = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.item_id",
          total_qty: { $sum: "$items.qty" },
          total_orders: { $sum: 1 }
        }
      },
      { $sort: { total_qty: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          item_id: "$_id",
          total_qty: 1,
          total_orders: 1 
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    next(err);
  }
};