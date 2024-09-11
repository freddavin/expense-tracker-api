import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../libs/prisma/connect';
import { ErrorCode, NotFoundError, UnauthorizedError } from '../exceptions';

interface Token {
  userId: string;
  name: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(new UnauthorizedError('Invalid token', ErrorCode.UNAUTHORIZED));
  }

  try {
    const SECRET_KEY = process.env.SECRET_KEY!;
    const validToken = jwt.verify(token, SECRET_KEY) as Token;

    const user = await prisma.user.findFirst({
      where: {
        id: validToken.userId,
      },
    });

    if (!user) {
      return next(new NotFoundError('User not found', ErrorCode.NOT_FOUND));
    }

    res.locals.context = { user };
    next();
  } catch (error) {
    return next(new UnauthorizedError('Unauthorized', ErrorCode.UNAUTHORIZED));
  }
};
