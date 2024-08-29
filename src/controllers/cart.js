import Cart from "../models/cart.js";

import { statusMessages } from "../config.js";

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
      cart,
    });
  } catch (_) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error occurred while finding the cart",
    });
  }
}
