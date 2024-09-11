import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../exceptions';

export const errorMiddleware = (
  err: HttpError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, message, errorCode, errors } = err;
  res.status(statusCode).json({ message, errorCode, errors });
};
