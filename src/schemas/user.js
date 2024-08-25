import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
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
