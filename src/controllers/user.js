import bcrypt from "bcrypt";

import User from "../models/user.js";

import { validateUser } from "../schemas/user.js";

import { SALT_ROUNDS, statusMessages } from "../config.js";

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
