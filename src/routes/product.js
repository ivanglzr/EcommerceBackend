import multer from "multer";
import path from "node:path";

import { Router } from "express";

import { validateProductId } from "../middlewares/validateProductId.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.js";

import {
  getProduct,
  getProducts,
  postProduct,
  putProduct,
  uploadImage,
} from "../controllers/product.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:productId", validateProductId, getProduct);

productRouter.use("/", authenticateAdmin);

productRouter.post("/", postProduct);
productRouter.put("/:productId", validateProductId, putProduct);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);

    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

export default productRouter;
