import { Schema, model } from "mongoose";
import { orderStatus } from "../config.js";

const OrderSchema = new Schema({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
      _id: false,
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: orderStatus,
    required: true,
    default: "pending",
  },
  address: { type: String, required: true },
  orderedAt: { type: Date, default: Date.now },
});

export default model("Order", OrderSchema);
