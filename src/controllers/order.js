import { Types } from "mongoose";

import { statusMessages } from "../config.js";

import { validateOrder } from "../schemas/order.js";

import Order from "../models/order.js";
import Product from "../models/product.js";

export async function postOrder(req, res) {
  const { data, error } = validateOrder(req.body);

  if (error) {
    return res.status(422).json({
      status: statusMessages.error,
      message: "Data isn't valid",
    });
  }

  const id = req.session;

  try {
    const productIds = data.products.map(({ productId }) =>
      Types.ObjectId.createFromHexString(productId)
    );

    const existingProducts = await Product.find({ _id: { $in: productIds } });

    if (existingProducts.length !== productIds.length) {
      return res.status(404).json({
        status: statusMessages.error,
        message: "Some products don't exist",
      });
    }

    const products = data.products.map(({ productId, quantity }) => ({
      productId: Types.ObjectId.createFromHexString(productId),
      quantity: quantity,
    }));

    const order = new Order({
      ...data,
      products,
      userId: id,
    });

    await order.save();

    return res.status(201).json({
      status: statusMessages.success,
      message: "Order created",
    });
  } catch (_) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error ocurred while creating the order",
    });
  }
}
