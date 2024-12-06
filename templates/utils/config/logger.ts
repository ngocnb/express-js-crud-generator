import winston, { format } from 'winston';
import winstonDailyRotateFile from 'winston-daily-rotate-file';
import env from './env';
import { NodeEnvEnum } from '../enum/base';

const loggerFormat = (options: { colorize?: boolean }) => {
  const label = format.label({
    label: env.LOGGER_LABEL,
  });

  const timestamp = format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  });

  const printf = format.printf(({ label, timestamp, level, message }) => {
    return `[${label}] [${timestamp}] - level: ${level} - message: ${message}`;
  });

  if (!options.colorize) {
    return format.combine(label, timestamp, printf);
  }

  const colorizeFormat = format.colorize({
    all: true,
  });
  return format.combine(label, timestamp, printf, colorizeFormat);
};

const logger = winston.createLogger({
  format: loggerFormat({}),
  level: env.LOGGER_LEVEL,
  transports: [new winston.transports.Console()],
});

switch (env.NODE_ENV) {
  case NodeEnvEnum.PRODUCTION:
  case NodeEnvEnum.STAGING:
  case NodeEnvEnum.DEVELOPMENT:
  case NodeEnvEnum.TEST:
    // Save log by date.
    const winstonDaily = new winstonDailyRotateFile({
      datePattern: 'YYYYMMDD',
      filename: 'winston_%DATE%.log',
      dirname: './src/logs',
      // Store up to 30 log files, files with old dates will be deleted.
      maxFiles: '30d',
    });

    logger.add(winstonDaily);

    logger.format = loggerFormat({
      colorize: true,
    });
    break;

  case NodeEnvEnum.LOCAL:
    logger.format = loggerFormat({
      colorize: true,
    });
    break;

  default:
    const message = `The NODE_ENV parameter is incorrect. Only the following types are accepted ${Object.values(
      NodeEnvEnum
    )}`;
    throw new Error(message);
}

export default logger;
