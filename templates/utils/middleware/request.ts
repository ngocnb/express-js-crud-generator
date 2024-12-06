import { NextFunction, Request, RequestHandler, Response } from 'express';
import { HTTP_RESPONSE } from '../constants/http-response';
import { ResponseStatusEnum } from '../enum/base';
import AppError from '../config/app-error';
import logger from '../config/logger';
import { IBaseResponse } from '../../interfaces/common';

export const requestNotFound = (req: Request, res: Response, next: NextFunction) => {
  const message = `Route ${req.originalUrl} not found`;
  return next(
    new AppError(HTTP_RESPONSE.COMMON.NOT_FOUND.code, message, HTTP_RESPONSE.COMMON.NOT_FOUND.code)
  );
};

export const requestError = (error: AppError, req: Request, res: Response, next: NextFunction) => {
  const labelLog = '[middleware/request.ts] [requestError]';
  const message = `Route ${req.originalUrl} error -> ${error.message}`;
  logger.error(`${labelLog} ${message}`);

  const response: IBaseResponse = {
    status: error.status || ResponseStatusEnum.ERROR,
    message: error.message,
    code: error.code || HTTP_RESPONSE.COMMON.INTERNAL_SERVER_ERROR.code,
  };

  if (error.data && Object.keys(error.data).length > 0) {
    response.data = error.data;
  }

  return res
    .status(error.statusCode || HTTP_RESPONSE.COMMON.INTERNAL_SERVER_ERROR.code)
    .json(response);
};

export const handleRequest =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
