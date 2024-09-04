import { NextFunction, Request, Response } from 'express';
import z from 'zod';
import { prisma } from '../../libs/prisma';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ErrorCode, UnauthorizedError } from '../../exceptions';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  const { email, password } = loginSchema.parse(req.body);

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
