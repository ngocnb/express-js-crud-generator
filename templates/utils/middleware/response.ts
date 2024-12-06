import { NextFunction, Request, Response } from 'express';
import { ResponseStatusEnum } from '../enum/base';
import { HTTP_RESPONSE } from '../constants/http-response';

const response = (req: Request, res: Response, next: NextFunction) => {
  /** Success */
  res.success = (message: string, code: string, data?: object) => {
    return res.status(HTTP_RESPONSE.COMMON.SUCCESS.code).json({
      status: ResponseStatusEnum.SUCCESS,
      message,
      code,
      data,
    });
  };

  res.created = (message: string, code: string, data?: object) => {
    return res.status(HTTP_RESPONSE.COMMON.CREATED.code).json({
      status: ResponseStatusEnum.SUCCESS,
      message,
      code,
      data,
    });
  };

  /** Failed */
  res.badRequest = (message: string, code: string, data?: object) => {
    return res.status(HTTP_RESPONSE.COMMON.BAD_REQUEST.code).json({
      status: ResponseStatusEnum.FAILED,
      message,
      code,
      data,
    });
  };

  res.unauthorized = (message: string, code: string) => {
    return res.status(HTTP_RESPONSE.COMMON.UNAUTHORIZED.code).json({
      status: ResponseStatusEnum.FAILED,
      message,
      code,
    });
  };

  res.forbidden = (message: string, code: string) => {
    return res.status(HTTP_RESPONSE.COMMON.FORBIDDEN.code).json({
      status: ResponseStatusEnum.FAILED,
      message,
      code,
    });
  };

  res.notFound = (message: string, code: string) => {
    return res.status(HTTP_RESPONSE.COMMON.NOT_FOUND.code).json({
      status: ResponseStatusEnum.FAILED,
      message,
      code,
    });
  };

  /** Error */
  res.internalServer = (message: string, code: string) => {
    return res.status(HTTP_RESPONSE.COMMON.INTERNAL_SERVER_ERROR.code).json({
      status: ResponseStatusEnum.ERROR,
      message,
      code,
    });
  };

  return next();
};

export default response;
