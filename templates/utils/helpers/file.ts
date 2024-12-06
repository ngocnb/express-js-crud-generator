import * as fs from 'fs';
import { HTTP_RESPONSE } from '../constants/http-response';
import logger from '../config/logger';
import env from '../config/env';

export default class FileHelper {
  static deleteFile = (file?: Express.Multer.File): boolean => {
    const labelLog = '[utils/file.ts] [deleteFile]';

    try {
      if (!file) {
        return true;
      }

      const path = file.path;
      logger.info(`${labelLog} path -> ${path}`);

      fs.unlinkSync(path);
      logger.debug(`${labelLog} delete file ${path} -> ${HTTP_RESPONSE.COMMON.SUCCESS.message}`);

      return true;
    } catch (error: any) {
      logger.error(`${labelLog} error -> ${error.message}`);
      return false;
    }
  };

  static getPathFile = (file: Express.Multer.File): string => {
    return `${env.BASE_URL}${env.FILE_ASSETS_PATH}/${file.filename}`;
  };

  static getPathFiles = (files: Express.Multer.File[]): string[] => {
    return files.map((file: Express.Multer.File) => this.getPathFile(file));
  };

  static analyticFile = async (file: Express.Multer.File) => {
    const getSize = (): number => {
      return file.size;
    };

    const getMimeType = (): string => {
      return file.mimetype;
    };

    const size = getSize();
    const mimeType = getMimeType();

    return {
      size,
      mimeType,
    };
  };
}
