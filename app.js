import express from "express";
import { statusMessages } from "./config.js";

const app = express();

app.disable("x-powered-by");
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    status: statusMessages.success,
    message: "Working correctly",
  });
});

export default app;
