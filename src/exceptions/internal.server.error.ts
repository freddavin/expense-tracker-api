import { HttpError } from './http.error';
import { ErrorCode } from './types';

export class InternalServerError extends HttpError {
  constructor(message: string, errorCode: ErrorCode, errors?: any) {
    super(message, 500, errorCode, errors);
  }
}
