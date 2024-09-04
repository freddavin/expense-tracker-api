import { Request, Response } from 'express';
import { prisma } from '../../libs/prisma';
import z from 'zod';
import { Category } from './types/enums';

export const createExpense = async (req: Request, res: Response) => {
  const { context } = res.locals;

  const expenseSchema = z.object({
    description: z.string(),
    category: z.nativeEnum(Category),
    amount: z.number().positive(),
    date: z.string().datetime(),
  });
  const { description, category, amount, date } = expenseSchema.parse(req.body);

  const { id } = await prisma.expense.create({
    data: {
      description,
      category,
      amount: amount * 100,
      date,
      user: {
        connect: {
          id: context.user.id,
        },
      },
    },
  });

  res.status(201).json({ id });
};
