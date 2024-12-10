import express, { Request, Response } from 'express';
import packageJson from '../../package.json';
import { HTTP_RESPONSE } from '../utils/constants/http-response';
import { handleRequest } from '../utils/middleware/request';
import { checkLogin } from '../utils/middleware/auth';
import authRoute from './auth';

const router = express.Router();

router.get(
    '/version',
    handleRequest(async (req: Request, res: Response) => {
        const message = `Version: ${packageJson.version}`;
        return res.success(message, HTTP_RESPONSE.COMMON.SUCCESS.code);
    })
);

router.use('/auth', authRoute);

export default router;
