import Joi from 'joi';
import { AccountRoleEnum, LoginTypeEnum, OsPlatformEnum } from '../utils/enum/base';

export default class AuthValidation {
    static login = {
        body: Joi.object().keys({
            type: Joi.string()
                .valid(...Object.values(LoginTypeEnum))
                .required(),
            username: Joi.string().max(255).trim().optional(),
            password: Joi.string().max(255).trim().optional(),
            googleIdToken: Joi.string().trim().optional(),
            appleIdToken: Joi.string().trim().optional(),
            firebase: Joi.object()
                .keys({
                    deviceId: Joi.string().max(255).trim().required(),
                    token: Joi.string().max(255).trim().required(),
                    osPlatform: Joi.string()
                        .valid(...Object.values(OsPlatformEnum))
                        .required()
                })
                .optional()
        })
        // query: Joi.object().keys({
        //   accountId: Joi.number().integer().min(1).optional(),
        // }),
        // params: Joi.object().keys({
        //   id: Joi.number().integer().required(),
        // }),
    };

    static signin = {
        body: Joi.object().keys({
            email: Joi.string().max(255).trim().required(),
            password: Joi.string().max(255).required()
        })
    };

    static signup = {
        body: Joi.object().keys({
            email: Joi.string().email().max(255).trim().required(),
            password: Joi.string().min(8).max(255).trim().required(),
            username: Joi.string().max(255).trim().required(),
            role: Joi.string().valid(...Object.values(AccountRoleEnum))
        })
    };

    static forgotPassword = {
        body: Joi.object().keys({
            email: Joi.string().email().max(255).required()
        })
    };

    static createNewPassword = {
        body: Joi.object().keys({
            code: Joi.string().min(6).required(),
            password: Joi.string().min(8).max(255).trim().required(),
            confirmPassword: Joi.string().min(8).max(255).trim().required()
        })
    };

    static restoreDeletedAccount = {
        body: Joi.object().keys({
            email: Joi.string().email().max(255).required()
        })
    };
}
