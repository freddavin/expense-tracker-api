import { HttpError } from './http.error';
import { ErrorCode } from './types';

export class UnauthorizedError extends HttpError {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, 401, errorCode);
  }
}
