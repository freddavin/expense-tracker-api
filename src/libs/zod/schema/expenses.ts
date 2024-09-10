import z from 'zod';
import { Category } from '../../../controllers/expenses';

export const CreateExpenseSchema = z.object({
  description: z.string(),
  category: z.nativeEnum(Category),
  amount: z.number().positive(),
  date: z.string().datetime(),
});

export const DeleteExpenseSchema = z.object({
  id: z.string().uuid(),
});
