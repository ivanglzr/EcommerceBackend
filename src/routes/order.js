import { Router } from "express";

import { postOrder } from "../controllers/order.js";

const orderRouter = Router();

orderRouter.post("/", postOrder);

export default orderRouter;
