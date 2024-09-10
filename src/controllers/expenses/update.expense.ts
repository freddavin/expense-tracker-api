import { Request, Response } from 'express';
import { prisma } from '../../libs/prisma';
import { ExpenseSchema, ExpenseIdSchema } from '../../libs/zod';
import { ErrorCode, UnprocessableContentError } from '../../exceptions';

export const updateExpense = async (req: Request, res: Response) => {
  const { context } = res.locals;
  const { id } = ExpenseIdSchema.parse(req.params);
  const { description, category, amount, date } = ExpenseSchema.parse(req.body);

  const expense = await prisma.expense.findFirst({
    where: { id, userId: context.user.id },
  });

  if (!expense) {
    throw new UnprocessableContentError(
      `Can not update the expense with id "${id}"`,
      ErrorCode.UNPROCESSABLE_CONTENT
    );
  }

  await prisma.expense.update({
    where: { id, userId: context.user.id },
    data: { description, category, amount: amount * 100, date },
  });

  res.status(200).json({ id });
};
