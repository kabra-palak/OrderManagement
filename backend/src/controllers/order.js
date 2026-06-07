import Order from "../models/order.js";

export const createOrder = async (req, res, next) => {
  try {
    const { store_id, items, total_amount } = req.body;

    if (!store_id || !items?.length || !total_amount) {
      return res.status(400).json({ message: "store_id, items, and total_amount are required" });
    }

    const order = await Order.create({ store_id, items, total_amount });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const { store_id, page = 1, limit = 10 } = req.query;

    const filter = store_id ? { store_id } : {};

    const [data, total] = await Promise.all([
      Order.find(filter)
        .skip((page - 1) * limit)
        .limit(+limit)
        .sort({ created_at: -1 }),
      Order.countDocuments(filter)
    ]);

    res.json({ data, total, page: +page, limit: +limit });
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ["PLACED", "PREPARING", "COMPLETED"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    next(err);
  }
};