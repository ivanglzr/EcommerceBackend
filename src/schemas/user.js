import { z } from "zod";

const nameSchema = z
  .string({
    invalid_type_error: "Name must be an string",
    required_error: "Name is required",
  })
  .min(2, "Name is too short");

const emailSchema = z
  .string({
    invalid_type_error: "Email must be an string",
    required_error: "Email is required",
  })
  .email("Email isn't valid")
  .min(5, "Email is too short");

const passwordSchema = z
  .string({
    invalid_type_error: "Password must be an string",
    required_error: "Password is required",
  })
  .min(8, "Password is too short");

const userSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
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
