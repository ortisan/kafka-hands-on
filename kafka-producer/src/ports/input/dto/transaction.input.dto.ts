import { z } from 'zod';

export const transactionSchema = z.object({
  userId: z.string(),
  amount: z.number(),
  currency: z.string(),
});

export type TransactionInputDto = z.infer<typeof transactionSchema>;
