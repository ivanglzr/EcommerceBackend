import { Router } from "express";

import { authenticateUser } from "../middlewares/authenticateUser.js";

import { loginUser, postUser } from "../controllers/user.js";

import orderRouter from "./order.js";
import cartRouter from "./cart.js";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", postUser);

userRouter.use("/", authenticateUser);

userRouter.use("/order", orderRouter);
userRouter.use("/cart", cartRouter);

export default userRouter;
