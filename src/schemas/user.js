import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Email isn't valid"),
  password: z.string().min(8, "Password is too short"),
});

const loginSchema = z.object({
  email: z.string().email("Email isn't valid"),
  password: z.string().min(8, "Password is too short"),
});

export function validateUser(user) {
  return userSchema.safeParse(user);
}

export function validatePartialUser(partialUser) {
  return userSchema.partial().safeParse(partialUser);
}

export function validateLogin(login) {
  return loginSchema.safeParse(login);
}
