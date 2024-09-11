import { Request, Response } from 'express';
import prisma from '../../libs/prisma/connect';
import { ListExpensesSchema } from '../../libs/zod';
import { buildDateFilter } from './helpers';

export const listExpenses = async (req: Request, res: Response) => {
  const { context } = res.locals;
  const { filter, startAt, endAt } = ListExpensesSchema.parse(req.query);

  const queryFilter = {
    userId: context.user.id,
    date: buildDateFilter(filter, startAt, endAt),
  };
  const expenses = await prisma.expense.findMany({
    where: {
      ...queryFilter,
    },
    select: {
      id: true,
      description: true,
      category: true,
      amount: true,
      date: true,
    },
  });

  const formattedExpenses = expenses.map((expense) => ({
    ...expense,
    amount: expense.amount / 100,
  }));

  res.status(200).json({ expenses: formattedExpenses });
};
