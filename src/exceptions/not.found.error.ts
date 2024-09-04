import { HttpError } from './http.error';
import { ErrorCode } from './types';

export class NotFoundError extends HttpError {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, 404, errorCode);
  }
}
