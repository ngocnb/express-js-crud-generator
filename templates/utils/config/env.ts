import dotenv from 'dotenv';
dotenv.config();

export default {
  /** Server */
  BASE_URL: String(process.env.BASE_URL),
  SERVER_PORT: Number(process.env.SERVER_PORT),
  WEB_SOCKET_PORT: Number(process.env.WEB_SOCKET_PORT),
  NODE_ENV: String(process.env.NODE_ENV),
  LIMIT_REQUEST_SIZE: String(process.env.LIMIT_REQUEST_SIZE),

  /** Common */
  BCRYPT_SALT_ROUND: Number(process.env.BCRYPT_SALT_ROUND),
  FILE_LIMIT_SIZE: String(process.env.FILE_LIMIT_SIZE),
  VERIFY_CODE_EXPIRED: Number(process.env.VERIFY_CODE_EXPIRED),
  PENDING_CHANGE_EXPIRED: Number(process.env.PENDING_CHANGE_EXPIRED),

  /** Secret key */
  SESSION_SECRET_KEY: String(process.env.SESSION_SECRET_KEY),
  API_KEY: String(process.env.API_KEY),

  /** File */
  FILE_STORAGE_PATH: String(process.env.FILE_STORAGE_PATH),
  FILE_ASSETS_PATH: String(process.env.FILE_ASSETS_PATH),

  /** Logger */
  LOGGER_LABEL: String(process.env.LOGGER_LABEL),
  LOGGER_LEVEL: String(process.env.LOGGER_LEVEL),

  /** Database (Postgresql) */
  POSTGRES_HOST: String(process.env.POSTGRES_HOST),
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT),
  POSTGRES_DB: String(process.env.POSTGRES_DB),
  POSTGRES_USER: String(process.env.POSTGRES_USER),
  POSTGRES_PASSWORD: String(process.env.POSTGRES_PASSWORD),

  /** JWT */
  JWT_ACCESS_TOKEN_KEY: String(process.env.JWT_ACCESS_TOKEN_KEY),
  JWT_REFRESH_TOKEN_KEY: String(process.env.JWT_REFRESH_TOKEN_KEY),
  JWT_ACCESS_TOKEN_EXPIRES: String(process.env.JWT_ACCESS_TOKEN_EXPIRES),
  JWT_REFRESH_TOKEN_EXPIRES: String(process.env.JWT_REFRESH_TOKEN_EXPIRES),
  JWT_TEST_ACCESS_TOKEN_EXPIRES: String(process.env.JWT_TEST_ACCESS_TOKEN_EXPIRES),

  /** AWS */
  AWS_ACCESS_KEY_ID: String(process.env.AWS_ACCESS_KEY_ID),
  AWS_SECRET_ACCESS_KEY: String(process.env.AWS_SECRET_ACCESS_KEY),

  /** S3 */
  S3_BUCKET_REGION: String(process.env.S3_BUCKET_REGION),
  S3_BUCKET_NAME: String(process.env.S3_BUCKET_NAME),

  /** Firebase */
  FIRE_BASE_PROJECT_ID: String(process.env.FIRE_BASE_PROJECT_ID),
  FIRE_BASE_CLIENT_EMAIL: String(process.env.FIRE_BASE_CLIENT_EMAIL),
  FIRE_BASE_PRIVATE_KEY: String(process.env.FIRE_BASE_PRIVATE_KEY),

  /** MAIL */
  SENDER_NAME: String(process.env.SENDER_NAME),
  SENDER_EMAIL: String(process.env.SENDER_EMAIL),
  BREVO_API_KEY: String(process.env.BREVO_API_KEY),

  FE_URL: String(process.env.FE_URL),
};
