import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});

export function validateUser(user) {
  return userSchema.safeParse(user);
}

export function validatePartialUser(partialUser) {
  return userSchema.partial().safeParse(partialUser);
}
