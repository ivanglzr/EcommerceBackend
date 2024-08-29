import { Router } from "express";

import { getCart, putCart } from "../controllers/cart.js";

const cartRouter = Router();

cartRouter.get("/", getCart);

cartRouter.put("/", putCart);

export default cartRouter;
