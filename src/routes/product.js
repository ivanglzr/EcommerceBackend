import { Router } from "express";

import { authenticateAdmin } from "../middlewares/authenticateAdmin.js";

import { postProduct } from "../controllers/product.js";

const productRouter = Router();

productRouter.use("/", authenticateAdmin);

productRouter.post("/", postProduct);

export default productRouter;
