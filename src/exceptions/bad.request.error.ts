import { HttpError } from './http.error';
import { ErrorCode } from './types';

export class BadRequestError extends HttpError {
  constructor(message: string, errorCode: ErrorCode, errors?: any) {
    super(message, 400, errorCode, errors);
  }
}
