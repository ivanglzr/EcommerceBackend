import { Router } from "express";

import { validateOrderId } from "../middlewares/validateOrderId.js";

import {
  getOrder,
  getOrders,
  postOrder,
  putOrder,
} from "../controllers/order.js";

const orderRouter = Router();

orderRouter.get("/:orderId", validateOrderId, getOrder);
orderRouter.get("/", getOrders);

orderRouter.post("/", postOrder);

orderRouter.put("/:orderId", validateOrderId, putOrder);

export default orderRouter;
