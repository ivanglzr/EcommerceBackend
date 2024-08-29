import { z } from "zod";

const nameSchema = z
  .string({
    invalid_type_error: "Name must be an string",
    required_error: "Name is required",
  })
  .min(3, "Product name is too short");

const descriptionSchema = z
  .string({
    invalid_type_error: "Description must be an string",
    required_error: "Description is required",
  })
  .min(10, "Description is too short");

const productSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
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
