import { AccountRoleEnum } from '../enum/base';
import AppError from '../config/app-error';
import { HTTP_RESPONSE } from '../constants/http-response';
import { Request } from 'express';

export default class AuthHelper {
    static checkUserLoginRole = (req: Request, userId: number) => {
        const role = req?.session?.account?.role;
        const accountId = req?.session?.account?.id;

        if (role === AccountRoleEnum.ADMIN || accountId === userId) {
            return;
        }

        throw new AppError(
            HTTP_RESPONSE.COMMON.FORBIDDEN.code,
            HTTP_RESPONSE.COMMON.FORBIDDEN.message,
        );
    };
}
