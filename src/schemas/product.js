import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3, "Product name is too short"),
  description: z.string().min(10, "Description is too short"),
  category: z.string().min(3, "Category is too short"),
  price: z.number().min(0.01, "Product price is too low"),
  stock: z.number().min(0, "Stock can't be negative").optional(),
});

export function validateProduct(product) {
  return productSchema.safeParse(product);
}

export function validatePartialProduct(partialProduct) {
  return productSchema.partial().safeParse(partialProduct);
}
