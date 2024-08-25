import express from "express";

import userRouter from "./src/routes/user.js";

const app = express();

app.disable("x-powered-by");
app.use(express.json());

app.use(userRouter);

export default app;
