import { z } from "zod";

export const OrderSchema = z.object({
    tokenIn: z.string().min(1),
    tokenOut: z.string().min(1),
    amount: z.number().positive(),
});