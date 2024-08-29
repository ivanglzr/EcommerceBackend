import { Types } from "mongoose";

import Cart from "../models/cart.js";
import Product from "../models/product.js";

import { statusMessages } from "../config.js";

import { validateCartSchema } from "../schemas/cart.js";

export async function getCart(req, res) {
  const id = req.session;

  try {
    const cart = await Cart.findOne({ userId: id });

    if (!cart) {
      return res.status(404).json({
        status: statusMessages.error,
        message: "Cart not found",
      });
    }

    return res.json({
      status: statusMessages.success,
      message: "Cart found",
      cart: cart.cart,
    });
  } catch (_) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error occurred while finding the cart",
    });
  }
}

export async function putCart(req, res) {
  const { data, error } = validateCartSchema(req.body);

  if (error) {
    return res.status(422).json({
      status: statusMessages.error,
      message: error.errors[0].message,
    });
  }

  const id = req.session;

  try {
    const productIds = data.map(({ productId }) =>
      Types.ObjectId.createFromHexString(productId)
    );

    const existingProducts = await Product.find({ _id: { $in: productIds } });

    if (existingProducts.length !== productIds.length) {
      return res.status(404).json({
        status: statusMessages.error,
        message: "Some products don't exist",
      });
    }

    const parsedCart = data.map(({ productId, quantity }) => ({
      productId: Types.ObjectId.createFromHexString(productId),
      quantity,
    }));

    await Cart.findOneAndUpdate(
      { userId: id },
      { cart: parsedCart, userId: id },
      { upsert: true }
    );

    return res.json({
      status: statusMessages.success,
      message: "Cart updated",
    });
  } catch (_) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error occurred while editing the cart",
    });
  }
}
