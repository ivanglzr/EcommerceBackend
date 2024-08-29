import { z } from "zod";

const productSchema = z.object({
  productId: z
    .string({
      invalid_type_error: "productId must be an string",
      required_error: "productId is required",
    })
    .length(24, "Id must be 24 characters long"),
  quantity: z.number().min(1, "Quantity must be greater than 0").optional(),
});

const productsSchema = z
  .array(productSchema)
  .nonempty("There must be atleast 1 product")
  .refine(
    (items) => {
      const uniqueProductIds = new Set(items.map((item) => item.productId));

      return uniqueProductIds.size === items.length;
    },
    {
      message: "There can't be duplicate products in an order",
    }
  );

const addressSchema = z
  .string({
    invalid_type_error: "Address must be an string",
    required_error: "Address is required",
  })
  .min(8, "Address is too short");

const orderSchema = z.object({
  products: productsSchema,
  address: addressSchema,
});

export function validateOrder(order) {
  return orderSchema.safeParse(order);
}

export function validatePartialOrder(partialOrder) {
  return orderSchema.partial().safeParse(partialOrder);
}
