import env from './env';
import { NodeEnvEnum } from '../enum/base';

const configServer = {
  isProductionEnv: env.NODE_ENV === NodeEnvEnum.PRODUCTION,
  isStagingEnv: env.NODE_ENV === NodeEnvEnum.STAGING,
  isDevelopmentEnv: env.NODE_ENV === NodeEnvEnum.DEVELOPMENT,
  isTestEnv: env.NODE_ENV === NodeEnvEnum.TEST,
  isLocalEnv: env.NODE_ENV === NodeEnvEnum.LOCAL,
};

export default configServer;
