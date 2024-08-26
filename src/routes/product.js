import { Router } from "express";

import { validateProductId } from "../middlewares/validateProductId.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.js";

import {
  getProduct,
  getProducts,
  postProduct,
  putProduct,
} from "../controllers/product.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:productId", validateProductId, getProduct);

productRouter.use("/", authenticateAdmin);

productRouter.post("/", postProduct);
productRouter.put("/:productId", validateProductId, putProduct);

export default productRouter;
