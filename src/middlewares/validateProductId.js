import { statusMessages } from "../config.js";

export function validateProductId(req, res, next) {
  const { productId } = req.params;

  if (!productId || productId.length !== 24 || typeof productId !== "string") {
    return res.status(400).json({
      status: statusMessages.error,
      message: "Id isn't valid",
    });
  }

  next();
}
