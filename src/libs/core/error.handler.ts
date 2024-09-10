import { NextFunction, Request, Response } from 'express';
import {
  BadRequestError,
  ErrorCode,
  HttpError,
  InternalServerError,
} from '../../exceptions';
import { ZodError } from 'zod';

export const errorHandler =
  (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      if (err instanceof HttpError) {
        return next(err);
      }
      if (err instanceof ZodError) {
        return next(
          new BadRequestError(
            'Input validation error',
            ErrorCode.VALIDATION_ERROR,
            err.issues
          )
        );
      }
      next(new InternalServerError('Something got wrong!', ErrorCode.INTERNAL));
    }
  };
