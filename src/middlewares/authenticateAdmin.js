import jwt from "jsonwebtoken";

import { statusMessages } from "../config.js";

export async function authenticateAdmin(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({
      status: statusMessages.error,
      message: "You aren't logged in",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);

    if (id !== process.env.ADMIN_ID) {
      return res.status(403).json({
        status: statusMessages.error,
        message: "Only the admin is allowed to access this resources",
      });
    }

    next();
  } catch (_) {
    return res.status(403).json({
      status: statusMessages.error,
      message: "Only the admin is allowed to access this resources",
    });
  }
}
