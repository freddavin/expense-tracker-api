import { Request, Response } from 'express';
import { prisma } from '../../libs/prisma';
import { ExpenseSchema } from '../../libs/zod';

export const createExpense = async (req: Request, res: Response) => {
  const { context } = res.locals;
  const { description, category, amount, date } = ExpenseSchema.parse(req.body);

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
