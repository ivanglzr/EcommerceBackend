import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT ?? 3900;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexion to DB successful"))
  .catch(() => console.error("Conexion failed"));

app.listen(PORT, () => console.log("Server listening on port", PORT));
