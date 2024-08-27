import { statusMessages } from "../config.js";

export function validateOrderId(req, res, next) {
  const { orderId } = req.params;

  if (!orderId || orderId.length !== 24 || typeof orderId !== "string") {
    return res.status(400).json({
      status: statusMessages.error,
      message: "Id isn't valid",
    });
  }

  next();
}
