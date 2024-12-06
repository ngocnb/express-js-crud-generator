import jwt from 'jsonwebtoken';
import configServer from '../config/config-server';
import env from '../config/env';
import { IPayloadToken } from '../../interfaces/auth';
import logger from '../config/logger';

const sign = (payload: IPayloadToken, secretKey: string, expires: string): string | undefined => {
  const labelLog = '[shared/jwt.ts] [sign]';
  logger.info(`${labelLog} payload -> ${JSON.stringify(payload)}`);

  try {
    return jwt.sign(payload, secretKey, { expiresIn: expires });
  } catch (error: any) {
    logger.error(`${labelLog} error -> ${error.message}`);
    return;
  }
};

const verify = (token: string, secretKey: string): IPayloadToken | undefined => {
  const labelLog = '[shared/jwt.ts] [verify]';
  logger.info(`${labelLog} token -> ${token}`);

  try {
    return jwt.verify(token, secretKey) as IPayloadToken;
  } catch (error: any) {
    logger.error(`${labelLog} error -> ${error.message}`);
    return;
  }
};

const generateToken = (payload: IPayloadToken) => {
  const expiresAccessToken = configServer.isTestEnv
    ? env.JWT_TEST_ACCESS_TOKEN_EXPIRES
    : env.JWT_ACCESS_TOKEN_EXPIRES;

  const accessToken = sign(payload, env.JWT_ACCESS_TOKEN_KEY, expiresAccessToken);
  const refreshToken = sign(payload, env.JWT_REFRESH_TOKEN_KEY, env.JWT_REFRESH_TOKEN_EXPIRES);

  return {
    access: accessToken,
    refresh: refreshToken,
  };
};

export default {
  sign,
  verify,
  generateToken,
};
