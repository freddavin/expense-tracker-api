import z from 'zod';
import { Category, Filter } from '../../../controllers/expenses';

export const ExpenseSchema = z.object({
  description: z.string(),
  category: z.nativeEnum(Category),
  amount: z.number().positive(),
  date: z.string().datetime(),
});

export const ExpenseIdSchema = z.object({
  id: z.string().uuid(),
});

export const ListExpensesSchema = z.object({
  filter: z.nativeEnum(Filter).optional(),
  startAt: z.string().date().optional(),
  endAt: z.string().date().optional(),
});
