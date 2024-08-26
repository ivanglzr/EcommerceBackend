import { statusMessages } from "../config.js";

import { validateProduct } from "../schemas/product.js";

import Product from "../models/product.js";

export async function getProducts(req, res) {
  try {
    const products = await Product.find({});

    const message =
      products.length === 0 ? "There isn't any products" : "Products found";

    return res.json({
      status: statusMessages.success,
      message,
      products,
    });
  } catch (_) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error occurred while finding the products",
    });
  }
}

export async function getProduct(req, res) {
  const { productId } = req.params;

  try {
    const product = Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: statusMessages.error,
        message: "Product not found",
      });
    }

    return res.json({
      status: statusMessages.success,
      message: "Product found",
      product,
    });
  } catch (_) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error occurred while finding the product",
    });
  }
}

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
