import { Router } from "express";

import { validateOrderId } from "../middlewares/validateOrderId.js";

import { getOrder, getOrders, postOrder } from "../controllers/order.js";

const orderRouter = Router();

orderRouter.get("/:orderId", validateOrderId, getOrder);
orderRouter.get("/", getOrders);

orderRouter.post("/", postOrder);

export default orderRouter;
