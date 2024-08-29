import { z } from "zod";

const productIdSchema = z
  .string({
    required_error: "productId is required",
    invalid_type_error: "productId must be an string",
  })
  .length(24, "Id must be 24 characters long");

const quantitySchema = z
  .number({
    invalid_type_error: "quantity must be a number",
  })
  .min(1, "Quantity must be greater than 0")
  .optional();

const cartSchema = z
  .array(
    z.object({
      productId: productIdSchema,
      quantity: quantitySchema,
    })
  )
  .refine(
    (items) => {
      const uniqueProductIds = new Set(items.map((item) => item.productId));

      return uniqueProductIds.size === items.length;
    },
    {
      message: "Duplicate product found",
    }
  );

export function validateCartSchema(cart) {
  return cartSchema.safeParse(cart);
}
