import { z } from "zod";

const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number().optional(),
});

export function validateProduct(product) {
  return productSchema.safeParse(product);
}

export function validatePartialProduct(partialProduct) {
  return productSchema.partial().safeParse(partialProduct);
}
