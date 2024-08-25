import { statusMessages } from "../config.js";

export function authenticateUser(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({
      status: statusMessages.error,
      message: "Unauthorized",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);

    if (id === undefined || id === null || id.length !== 24) {
      return res.status(400).json({
        status: statusMessages.error,
        message: "Id isn't valid",
      });
    }

    req.session = id;
  } catch (_) {
    return res.status(401).json({
      status: statusMessages.error,
      message: "Unauthorized",
    });
  }

  next();
}
