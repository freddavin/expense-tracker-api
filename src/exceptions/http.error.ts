import { ErrorCode } from './types';

export class HttpError extends Error {
  message: string;
  statusCode: number;
  errorCode: ErrorCode;
  errors?: any;

  constructor(
    message: string,
    statusCode: number,
    errorCode: ErrorCode,
    errors?: any
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors;
  }
}
