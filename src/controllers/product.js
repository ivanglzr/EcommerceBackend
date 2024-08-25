import { statusMessages } from "../config.js";

import { validateProduct } from "../schemas/product.js";

import Product from "../models/product.js";

export async function postProduct(req, res) {
  const { data, error } = validateProduct(req.body);

  if (error) {
    return res.status(422).json({
      status: statusMessages.error,
      message: "Data isn't valid",
    });
  }

  try {
    const product = new Product(data);

    await product.save();

    return res.status(201).json({
      status: statusMessages.success,
      message: "Product created",
    });
  } catch (_) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error occurred while creating the product",
    });
  }
}
