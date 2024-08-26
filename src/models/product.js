import { Schema, model } from "mongoose";

const ProductSchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  image: { type: String, default: null },
});

export default model("Product", ProductSchema);
