import fs from "node:fs/promises";
import path from "node:path";

import { statusMessages } from "../config.js";

import { validatePartialProduct, validateProduct } from "../schemas/product.js";

import Product from "../models/product.js";

import { imagesDirectory, defaultImageName } from "../config.js";

const getImagePath = (imageName) =>
  path.join(process.cwd(), imagesDirectory, imageName);

const deleteImage = async (imageName) => {
  if (imageName && imageName !== defaultImageName) {
    try {
      await fs.unlink(path.join(process.cwd(), imagesDirectory, imageName));
    } catch (err) {}
  }
};

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
    const product = await Product.findById(productId);

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
      message: error.errors[0].message,
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

export async function putProduct(req, res) {
  const { productId } = req.params;

  const { data, error } = validatePartialProduct(req.body);

  if (error) {
    return res.status(422).json({
      status: statusMessages.error,
      message: error.errors[0].message,
    });
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      status: statusMessages.error,
      message: "Body is empty",
    });
  }

  try {
    const product = await Product.findByIdAndUpdate(productId, data);

    if (!product) {
      return res.status(404).json({
        status: statusMessages.error,
        message: "Product not found",
      });
    }

    return res.json({
      status: statusMessages.success,
      message: "Product edited",
    });
  } catch (_) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error occurred while editing the product",
    });
  }
}

export async function uploadImage(req, res) {
  const { file } = req;

  if (!file) {
    return res.status(400).json({
      status: statusMessages.error,
      message: "There isn't an image",
    });
  }

  const ext = file.mimetype.split("/")[1];

  if (ext !== "png" && ext !== "jpeg" && ext !== "jpg" && ext !== "png") {
    await deleteImage(file.filename);

    return res.status(400).json({
      status: statusMessages.error,
      message: "File type isn't valid",
    });
  }

  const { productId } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(productId, {
      image: file.filename,
    });

    if (!product) {
      await deleteImage(file.filename);

      return res.status(404).json({
        status: statusMessages.error,
        message: "Product not found",
      });
    }

    await deleteImage(product.image);

    return res.json({
      status: statusMessages.success,
      message: "Image uploaded",
    });
  } catch (_) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error ocurred while uploading the image",
    });
  }
}
