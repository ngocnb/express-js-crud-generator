import { NextFunction, Request, Response } from 'express';
import { handleRequest } from './request';
import logger from '../config/logger';
import { HTTP_RESPONSE } from '../constants/http-response';

const checkFile = (type: 'SINGLE' | 'MULTIPLE' | 'FIELDS', requiredFields?: string[]) =>
  handleRequest((req: Request, res: Response, next: NextFunction) => {
    const labelLog = '[middleware/file.ts] [checkFile]';
    let isValid = true;

    switch (type) {
      case 'SINGLE':
        const file = req.file as Express.Multer.File;
        logger.info(`${labelLog} file -> ${JSON.stringify(file)}`);

        if (!file) {
          isValid = false;
        }
        break;

      case 'MULTIPLE':
        const files = req.files as Express.Multer.File[];
        logger.info(`${labelLog} files -> ${JSON.stringify(files)}`);

        if (!files || files.length === 0) {
          isValid = false;
        }
        break;

      case 'FIELDS':
        const fields = Object.keys(req.files ?? {});
        logger.info(`${labelLog} file in fields -> ${JSON.stringify(req.files)}`);

        if (fields.length === 0) {
          isValid = false;
        }

        if (requiredFields && requiredFields.length > 0) {
          for (const field of requiredFields) {
            const files = (req.files as Record<string, Express.Multer.File[]>)[field];
            if (!files || files.length === 0) {
              isValid = false;
              break;
            }
          }
        }
        break;

      default:
        break;
    }

    if (!isValid) {
      logger.error(`${labelLog} ${HTTP_RESPONSE.FILE.REQUIRED.message}`);

      return res.badRequest(
        HTTP_RESPONSE.FILE.REQUIRED.message,
        HTTP_RESPONSE.COMMON.BAD_REQUEST.code
      );
    }

    return next();
  });

export default checkFile;
