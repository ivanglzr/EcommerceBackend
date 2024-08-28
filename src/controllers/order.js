import { Types } from "mongoose";

import { orderStatus, statusMessages } from "../config.js";

import { validateOrder } from "../schemas/order.js";

import Order from "../models/order.js";
import Product from "../models/product.js";

export async function getOrder(req, res) {
  const { orderId } = req.params;
  const id = req.session;

  try {
    const order = await Order.findOne({ _id: orderId, userId: id });

    if (!order) {
      return res.status(404).json({
        status: statusMessages.error,
        message: "Order not found",
      });
    }

    const parsedOrder = {
      _id: order._id,
      products: order.products,
      status: order.status,
      address: order.address,
      orderedAt: order.orderedAt,
    };

    return res.json({
      status: statusMessages.success,
      message: "Order found",
      order: parsedOrder,
    });
  } catch (_) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error ocurred while finding the order",
    });
  }
}

export async function getOrders(req, res) {
  const id = req.session;

  try {
    const orders = await Order.find({ userId: id });

    const message =
      orders.length === 0 ? "User doesn't have any orders" : "Orders found";

    const parsedOrders = orders.map((order) => {
      const parsedOrder = {
        _id: order._id,
        products: order.products,
        status: order.status,
        address: order.address,
        orderedAt: order.orderedAt,
      };

      return parsedOrder;
    });

    return res.json({
      status: statusMessages.success,
      message,
      orders: parsedOrders,
    });
  } catch (_) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error ocurred while finding the orders",
    });
  }
}

export async function postOrder(req, res) {
  const { data, error } = validateOrder(req.body);

  if (error) {
    return res.status(422).json({
      status: statusMessages.error,
      message: error.errors[0].message,
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
      status: orderStatus.pending,
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

export async function putOrder(req, res) {
  const { data, error } = validateOrder(req.body);

  if (error) {
    return res.status(422).json({
      status: statusMessages.error,
      message: error.errors[0].message,
    });
  }

  const id = req.session;
  const { orderId } = req.params;

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

    const orderData = { ...data, products };

    const order = await Order.findOneAndUpdate(
      { userId: id, _id: orderId },
      orderData
    );

    if (!order) {
      return res.status(404).json({
        status: statusMessages.error,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      status: statusMessages.success,
      message: "Order updated",
    });
  } catch (_) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error ocurred while creating the order",
    });
  }
}

export async function deleteOrder(req, res) {
  const id = req.session;
  const { orderId } = req.params;

  try {
    const order = await Order.findOneAndDelete({ userId: id, _id: orderId });

    if (!order) {
      return res.status(404).json({
        status: statusMessages.error,
        message: "Order not found",
      });
    }

    return res.json({
      status: statusMessages.success,
      message: "Order deleted",
    });
  } catch (_) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error occurred while deleting the order",
    });
  }
}
