import { NextFunction, Request, Response } from 'express';
import { ISessionAccount } from '../../interfaces/auth';
import jtwService from '../helpers/jwt';
import { handleRequest } from './request';
import logger from '../config/logger';
import { HTTP_RESPONSE } from '../constants/http-response';
import env from '../config/env';
import { repositories } from '../config/di';
import { AccountRoleEnum } from '../enum/base';

export const checkLogin = handleRequest(async (req: Request, res: Response, next: NextFunction) => {
  const labelLog = '[middleware/auth.ts] [checkLogin]';
  const authorization = req.headers.authorization;
  let accessToken;

  if (authorization && authorization.startsWith('Bearer')) {
    accessToken = authorization.split(' ')[1];
    logger.debug(`${labelLog} accessToken -> ${accessToken}`);
  }

  if (!accessToken) {
    const message = HTTP_RESPONSE.COMMON.UNAUTHORIZED.message;
    logger.error(`${labelLog} ${message}`);
    return res.unauthorized(message, HTTP_RESPONSE.COMMON.UNAUTHORIZED.code);
  }

  const accessTokenDecoded = jtwService.verify(accessToken, env.JWT_ACCESS_TOKEN_KEY);
  logger.debug(`${labelLog} accessTokenDecoded -> ${JSON.stringify(accessTokenDecoded)}`);
  if (!accessTokenDecoded) {
    const message = HTTP_RESPONSE.COMMON.UNAUTHORIZED.message;
    logger.error(`${labelLog} ${message}`);
    return res.unauthorized(message, HTTP_RESPONSE.COMMON.UNAUTHORIZED.code);
  }

  const foundAccount = await repositories.account.getDetailAccountById(accessTokenDecoded.id);
  if (!foundAccount) {
    const message = HTTP_RESPONSE.AUTH.ACCOUNT_NOT_FOUND.message;
    logger.error(`${labelLog} ${message}`);

    return res.notFound(message, HTTP_RESPONSE.AUTH.ACCOUNT_NOT_FOUND.code);
  }

  req.session.account = {
    id: Number(foundAccount.id),
    role: foundAccount.role,
    email: foundAccount?.email,
  };
  logger.debug(`${labelLog} sessionAccount -> ${JSON.stringify(req.session.account)}`);

  return next();
});

export const checkPermission = (...roles: string[]) =>
  handleRequest((req: Request, res: Response, next: NextFunction) => {
    const labelLog = '[middleware/auth.ts] [checkPermission]';
    const account: ISessionAccount = req.session.account!;
    logger.info(`${labelLog} expect role -> ${roles}`);
    logger.info(`${labelLog} actual role -> ${account.role}`);

    if (!roles.includes(account.role)) {
      const message = HTTP_RESPONSE.COMMON.FORBIDDEN.message;
      logger.error(`${labelLog} ${message}`);
      return res.forbidden(message, HTTP_RESPONSE.COMMON.FORBIDDEN.code);
    }

    return next();
  });

export const protectApi = handleRequest((req: Request, res: Response, next: NextFunction) => {
  const labelLog = '[middleware/auth.ts] [protectApi]';
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== env.API_KEY) {
    const message = HTTP_RESPONSE.AUTH.INVALID_API_KEY.message;
    logger.error(`${labelLog} ${message}`);
    return res.unauthorized(message, HTTP_RESPONSE.AUTH.INVALID_API_KEY.code);
  }

  return next();
});

export const checkAdminPermission = handleRequest((req: Request, res: Response, next: NextFunction) => {    
    const labelLog = '[middleware/auth.ts] [checkAdminPermission]';
    const role = req?.session?.account?.role;
    logger.info(`${labelLog} actual role -> ${role}`);

    if (!role || role !== AccountRoleEnum.ADMIN) {
      const message = HTTP_RESPONSE.COMMON.FORBIDDEN.message;
      logger.error(`${labelLog} ${message}`);
      return res.forbidden(message, HTTP_RESPONSE.COMMON.FORBIDDEN.code);
    }

    return next();
  });
