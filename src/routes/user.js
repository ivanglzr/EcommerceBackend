import { Router } from "express";

import { loginUser, postUser } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", postUser);

export default userRouter;
