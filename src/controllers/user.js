import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

import { validateUser, validateLogin } from "../schemas/user.js";

import { SALT_ROUNDS, statusMessages } from "../config.js";

export async function loginUser(req, res) {
  const { data, error } = validateLogin(req.body);

  if (error) {
    return res.status(422).json({
      status: statusMessages.error,
      message: "Data isn't valid",
    });
  }

  try {
    const { email, password } = data;

    const userInDb = await User.findOne({ email });

    if (!userInDb) {
      return res.status(404).json({
        status: statusMessages.error,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, userInDb.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: statusMessages.error,
        message: "Unauthorized",
      });
    }

    const token = jwt.sign({ id: userInDb._id }, process.env.SECRET_KEY, {
      algorithm: "HS512",
      expiresIn: "1h",
    });

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
      })
      .json({
        status: statusMessages.success,
        message: "Authorized",
      });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      status: statusMessages.error,
      message: "An error ocurred while logging in",
    });
  }
}

export async function postUser(req, res) {
  const { data, error } = validateUser(req.body);

  if (error) {
    return res.status(422).json({
      status: statusMessages.error,
      message: "Data isn't valid",
    });
  }

  try {
    const isUserInDB = await User.findOne({ email: data.email });

    if (isUserInDB) {
      return res.status(409).json({
        status: statusMessages.error,
        message: "There is already a user registered under that email",
      });
    }

    const encryptedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const newUser = {
      ...data,
      password: encryptedPassword,
    };

    const user = new User(newUser);

    await user.save();

    return res.status(201).json({
      status: statusMessages.success,
      message: "User registered",
    });
  } catch (_) {
    return res.status(500).json({
      status: statusMessages.error,
      message: "An error occurred while registering the user",
    });
  }
}
