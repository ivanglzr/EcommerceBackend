import { Schema, model } from "mongoose";

const CartSchema = Schema({
  cart: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: number, default: 1 },
      _id: false,
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default model("Cart", CartSchema);
