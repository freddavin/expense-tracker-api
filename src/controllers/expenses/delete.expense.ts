import { Request, Response } from 'express';
import { prisma } from '../../libs/prisma';
import { DeleteExpenseSchema } from '../../libs/zod';
import { ErrorCode, UnprocessableContentError } from '../../exceptions';

export const deleteExpense = async (req: Request, res: Response) => {
  const { context } = res.locals;
  const { id } = DeleteExpenseSchema.parse(req.params);

  const expense = await prisma.expense.deleteMany({
    where: {
      id,
      userId: context.user.id,
    },
  });

  if (expense.count === 0) {
    throw new UnprocessableContentError(
      'Can not delete this informed id',
      ErrorCode.UNPROCESSABLE_CONTENT
    );
  }

  res.status(200).json({ id });
};
