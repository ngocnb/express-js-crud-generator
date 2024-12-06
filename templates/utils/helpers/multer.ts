import bytes from 'bytes';
import { Request } from 'express';
import Multer, { FileFilterCallback, StorageEngine } from 'multer';
import env from '../config/env';
import AppError from '../config/app-error';
import { HTTP_RESPONSE } from '../constants/http-response';
import { FILE_MIME_TYPE_FORMAT } from '../constants/common';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;

const storage: StorageEngine = Multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback: DestinationCallback) => {
    return callback(null, env.FILE_STORAGE_PATH);
  },
  filename(req: Request, file: Express.Multer.File, callback: FilenameCallback) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}_${file.originalname}`;

    return callback(null, filename);
  },
});

const fileFilter = {
  any: (req: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
    return callback(null, true);
  },

  media: (req: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
    const whiteList = [
      FILE_MIME_TYPE_FORMAT.IMAGE.PNG,
      FILE_MIME_TYPE_FORMAT.IMAGE.JPG,
      FILE_MIME_TYPE_FORMAT.IMAGE.JPEG,
      FILE_MIME_TYPE_FORMAT.IMAGE.GIF,
      FILE_MIME_TYPE_FORMAT.VIDEO.MP4,
    ];
    if (!whiteList.includes(file.mimetype)) {
      return callback(
        new AppError(
          HTTP_RESPONSE.COMMON.BAD_REQUEST.code,
          HTTP_RESPONSE.FILE.EXT_INVALID.message,
          HTTP_RESPONSE.COMMON.BAD_REQUEST.code
        )
      );
    }

    return callback(null, true);
  },

  image: (req: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
    const whiteList = [
      FILE_MIME_TYPE_FORMAT.IMAGE.PNG,
      FILE_MIME_TYPE_FORMAT.IMAGE.JPG,
      FILE_MIME_TYPE_FORMAT.IMAGE.JPEG,
    ];
    if (!whiteList.includes(file.mimetype)) {
      return callback(
        new AppError(
          HTTP_RESPONSE.COMMON.BAD_REQUEST.code,
          HTTP_RESPONSE.FILE.EXT_INVALID.message,
          HTTP_RESPONSE.COMMON.BAD_REQUEST.code
        )
      );
    }

    return callback(null, true);
  },
};

const multerService = (type: 'ANY' | 'MEDIA' | 'IMAGE'): Multer.Multer => {
  let size = bytes(env.FILE_LIMIT_SIZE);
  let filter = fileFilter.any;

  switch (type) {
    case 'MEDIA':
      filter = fileFilter.media;
      break;

    case 'IMAGE':
      filter = fileFilter.image;
      break;

    case 'ANY':
    default:
      break;
  }

  return Multer({
    storage: storage,
    limits: {
      fileSize: size,
    },
    fileFilter: filter,
  });
};

export default multerService;
