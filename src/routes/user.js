import { Router } from "express";

import { postUser } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/register", postUser);

export default userRouter;
