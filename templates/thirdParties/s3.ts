import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import env from '../utils/config/env';
import logger from '../utils/config/logger';
import configServer from '../utils/config/config-server';
import FileHelper from '../utils/helpers/file';

class S3Singleton {
  private static instance: S3Singleton;
  private s3Client: S3Client;
  private labelLog = '[patterns/s3.ts]';

  constructor() {
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
      region: env.S3_BUCKET_REGION,
    });
  }

  public static getInstance(): S3Singleton {
    if (!S3Singleton.instance) {
      S3Singleton.instance = new S3Singleton();
    }
    return S3Singleton.instance;
  }

  async uploadFiles(
    files: Express.Multer.File[],
    bucketName: string = env.S3_BUCKET_NAME
  ): Promise<string[]> {
    const uploadPromises: Promise<string>[] = files.map(async (file) => {
      const locationUploaded = await this.uploadFile(file, bucketName);
      logger.info(`${this.labelLog} [uploadFiles] File Uploaded -> ${locationUploaded}`);
      return locationUploaded;
    });

    try {
      const uploadResults = await Promise.all(uploadPromises);
      return uploadResults;
    } catch (error) {
      logger.error(`${this.labelLog} [uploadFiles] Uploading Files Error -> ${error}`);
      throw error;
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    bucketName: string = env.S3_BUCKET_NAME
  ): Promise<string> {
    try {
      let linkS3 = '';
      const data = fs.readFileSync(file.path);
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: file.filename,
        Body: data,
        ContentDisposition: 'inline',
        ContentType: file.mimetype,
        // ACL: 'public-read', // Optional: Set file permissions
      });
      await this.s3Client.send(command);

      if (!configServer.isTestEnv) {
        // Delete file.
        FileHelper.deleteFile(file);
      }

      linkS3 = `https://${bucketName}.s3.amazonaws.com/${file.filename}`;

      return linkS3;
    } catch (error) {
      logger.error(
        `${this.labelLog} [uploadFile] Uploading File ${file.filename} Error -> ${error} `
      );
      throw error;
    }
  }

  async deleteFile(fileName: string, bucketName: string = env.S3_BUCKET_NAME): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: fileName,
      });

      await this.s3Client.send(command);
    } catch (error) {
      logger.error(`deleteFile] Delete File ${fileName} Error -> ${error} `);
      return false;
    }
    return true;
  }
}

const s3Singleton = S3Singleton.getInstance();
export default s3Singleton;
