import { Router } from "express";

import { authenticateAdmin } from "../middlewares/authenticateAdmin.js";

import { postProduct } from "../controllers/product.js";

const productRouter = Router();

productRouter.post("/", postProduct);
productRouter.use("/", authenticateAdmin);

export default productRouter;
