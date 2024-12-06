import { ResponseStatusEnum } from '../enum/base';

export default class AppError<T = undefined> extends Error {
  status: string;

  constructor(
    public statusCode: number,
    public message: string,
    public code?: string | number,
    public data?: T
  ) {
    super(message);
    this.status = `${statusCode}`.startsWith('4')
      ? ResponseStatusEnum.FAILED
      : ResponseStatusEnum.ERROR;
    this.code = code ? code : statusCode;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}
