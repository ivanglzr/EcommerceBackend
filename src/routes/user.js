import { Router } from "express";

import { authenticateUser } from "../middlewares/authenticateUser.js";

import { loginUser, postUser } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", postUser);

userRouter.use("/user", authenticateUser);

export default userRouter;
