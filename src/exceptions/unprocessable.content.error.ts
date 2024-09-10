import { HttpError } from './http.error';
import { ErrorCode } from './types';

export class UnprocessableContentError extends HttpError {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, 422, errorCode);
  }
}
