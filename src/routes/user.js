import { Router } from "express";

import { authenticateUser } from "../middlewares/authenticateUser.js";

import { loginUser, postUser } from "../controllers/user.js";

import orderRouter from "./order.js";

const userRouter = Router();

userRouter.post("/user/login", loginUser);
userRouter.post("/user/register", postUser);

userRouter.use("/user", authenticateUser);

userRouter.use("/user", orderRouter);

export default userRouter;
