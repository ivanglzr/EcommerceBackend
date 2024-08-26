import { z } from "zod";
import { orderStatus } from "../config.js";

const orderSchema = z.object({
  products: z
    .array(
      z.object({
        productId: z.string().length(24, "Id must be 24 characters long"),
        quantity: z.number().optional(),
      })
    )
    .nonempty("There must be atleast 1 product"),
  status: z.enum(orderStatus).optional(),
  address: z.string().min(8, "Address is too short"),
});

export function validateOrder(order) {
  return orderSchema.safeParse(order);
}

export function validatePartialOrder(partialOrder) {
  return orderSchema.partial().safeParse(partialOrder);
}
