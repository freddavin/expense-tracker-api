import { Request, Response } from 'express';
import prisma from '../../libs/prisma/connect';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ErrorCode, UnauthorizedError } from '../../exceptions';
import { LoginSchema } from '../../libs/zod';

export const login = async (req: Request, res: Response) => {
  const { email, password } = LoginSchema.parse(req.body);

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new UnauthorizedError('Wrong email', ErrorCode.INVALID_USER);
  }

  if (!compareSync(password, user.password)) {
    throw new UnauthorizedError('Wrong password', ErrorCode.INVALID_USER);
  }

  const SECRET_KEY = process.env.SECRET_KEY!;
  const token = jwt.sign({ userId: user.id, name: user.name }, SECRET_KEY, {
    expiresIn: 60 * 5,
  });

  res.status(200).json({ token });
};
