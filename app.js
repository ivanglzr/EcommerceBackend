import express from "express";

import { cors } from "./src/middlewares/cors.js";
import cookieParser from "cookie-parser";

import userRouter from "./src/routes/user.js";
import productRouter from "./src/routes/product.js";

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(cors);
app.use(cookieParser());

app.use("/user", userRouter);

app.use("/product", productRouter);

export default app;
