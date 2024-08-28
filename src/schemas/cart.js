import { z } from "zod";

const cartSchema = z.array(
  z.object({
    productId: z.string().length(24, "Id must be 24 characters long"),
    quantity: z.number().min(1, "Quantity must be greater than 0").optional(),
  })
);

export function validateCartSchema(cart) {
  return cartSchema.safeParse(cart);
}
