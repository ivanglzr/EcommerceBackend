import express from "express";

import { cors } from "./src/middlewares/cors.js";
import cookieParser from "cookie-parser";

import userRouter from "./src/routes/user.js";

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(cors);
app.use(cookieParser());

app.use(userRouter);

export default app;
