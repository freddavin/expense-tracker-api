import { Request, Response } from 'express';
import { hashSync } from 'bcrypt';
import prisma from '../../libs/prisma/connect';
import { BadRequestError, ErrorCode } from '../../exceptions';
import { SignupSchema } from '../../libs/zod';

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = SignupSchema.parse(req.body);

  const user = await prisma.user.findFirst({ where: { email } });

  if (user) {
    throw new BadRequestError(
      'This email was already used in another registration',
      ErrorCode.USER_ALREADY_EXISTS
    );
  }

  const { id } = await prisma.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });

  res.status(201).json({ id });
};
