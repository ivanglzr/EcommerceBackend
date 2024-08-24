import { z } from "zod";
import { orderStatus } from "../config.js";

const orderSchema = z.object({
  products: z.array(
    z.object({
      productId: z.string().length(24),
      quantity: z.number().optional(),
    })
  ),
  userId: z.string().length(24),
  status: z.enum(orderStatus).optional(),
  address: z.string(),
});

export function validateOrder(order) {
  return orderSchema.safeParse(order);
}

export function validatePartialOrder(partialOrder) {
  return orderSchema.partial().safeParse(partialOrder);
}
