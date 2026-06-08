import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  item_id: { type: String, required: true },
  qty:     { type: Number, required: true, min: 1 }
}, { _id: false });

const orderArchiveSchema = new mongoose.Schema({
  store_id:     { type: String, required: true, index: true },
  items:        { type: [itemSchema], required: true },
  total_amount: { type: Number, required: true },
  status: {
    type:    String,
    enum:    ["PLACED", "PREPARING", "COMPLETED"],
    default: "PLACED"
  },
  created_at:   { type: Date, index: true },
  archived_at:  { type: Date, default: Date.now }
});

export default mongoose.model("OrderArchive", orderArchiveSchema);