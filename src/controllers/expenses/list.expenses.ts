import { Request, Response } from 'express';
import { prisma } from '../../libs/prisma';

export const listExpenses = async (req: Request, res: Response) => {
  const { context } = res.locals;

  const expenses = await prisma.expense.findMany({
    where: {
      userId: context.user.id,
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
