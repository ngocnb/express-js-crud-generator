import { Request, Response } from 'express';
import { HTTP_RESPONSE } from '../utils/constants/http-response';
import { Inject, Service } from 'typedi';
import AuthService from '../services/auth';

@Service()
export default class AuthController {
    @Inject() authService: AuthService;

    login = async (req: Request, res: Response) => {
        const result = await this.authService.login(req);

        return res.success(HTTP_RESPONSE.AUTH.LOGIN_SUCCESS.message, HTTP_RESPONSE.AUTH.LOGIN_SUCCESS.code, result);
    };

    signup = async (req: Request, res: Response) => {
        const result = await this.authService.signup(req);

        return res.success(HTTP_RESPONSE.COMMON.SUCCESS.message, HTTP_RESPONSE.COMMON.SUCCESS.code, result);
    };

    forgotPassword = async (req: Request, res: Response) => {
        const result = await this.authService.forgotPassword(req);

        return res.success(HTTP_RESPONSE.COMMON.SUCCESS.message, HTTP_RESPONSE.COMMON.SUCCESS.code);
    };

    createNewPassword = async (req: Request, res: Response) => {
        const result = await this.authService.createNewPassword(req);

        return res.success(HTTP_RESPONSE.COMMON.SUCCESS.message, HTTP_RESPONSE.COMMON.SUCCESS.code, result);
    };

    me = async (req: Request, res: Response) => {
        const result = await this.authService.getUserLogin(req);

        return res.success(HTTP_RESPONSE.AUTH.LOGIN_SUCCESS.message, HTTP_RESPONSE.AUTH.LOGIN_SUCCESS.code, result);
    };

    restoreDeletedAccount = async (req: Request, res: Response) => {
        const result = await this.authService.restoreDeletedAccount(req);

        return res.success(HTTP_RESPONSE.AUTH.LOGIN_SUCCESS.message, HTTP_RESPONSE.AUTH.LOGIN_SUCCESS.code, result);
    };
}
