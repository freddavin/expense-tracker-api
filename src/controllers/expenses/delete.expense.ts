import { Request, Response } from 'express';
import { prisma } from '../../libs/prisma';
import { ExpenseIdSchema } from '../../libs/zod';
import { ErrorCode, UnprocessableContentError } from '../../exceptions';

export const deleteExpense = async (req: Request, res: Response) => {
  const { context } = res.locals;
  const { id } = ExpenseIdSchema.parse(req.params);

  const expense = await prisma.expense.deleteMany({
    where: {
      id,
      userId: context.user.id,
    },
  });

  if (expense.count === 0) {
    throw new UnprocessableContentError(
      `Can not delete the expense with id "${id}"`,
      ErrorCode.UNPROCESSABLE_CONTENT
    );
  }

  res.status(200).json({ id });
};
