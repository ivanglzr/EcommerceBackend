import { Router } from "express";

import { validateOrderId } from "../middlewares/validateOrderId.js";

import {
  getOrder,
  getOrders,
  postOrder,
  putOrder,
  deleteOrder,
} from "../controllers/order.js";

const orderRouter = Router();

orderRouter.get("/:orderId", validateOrderId, getOrder);
orderRouter.get("/", getOrders);

orderRouter.post("/", postOrder);

orderRouter.put("/:orderId", validateOrderId, putOrder);

orderRouter.delete("/:orderId", validateOrderId, deleteOrder);

export default orderRouter;
