import { Inject, Service } from 'typedi';
import AccountRepository from '../repositories/account';
import { IBodyCreateNewPassword, IBodyForgotPassword, IBodySignin, IBodySignup } from '../interfaces/auth';
import { HTTP_RESPONSE } from '../utils/constants/http-response';
import AppError from '../utils/config/app-error';
import bcryptService from '../utils/helpers/bcrypt';
import jwtService from '../utils/helpers/jwt';
import { AccountRoleEnum, AccountStatusEnum, TemplateEmailPathEnum, VerifyCodeTypeEnum } from '../utils/enum/base';
import { Request, Response } from 'express';
import env from '../utils/config/env';
import database from '../utils/config/database';
import { EntityManager } from 'typeorm';
import VerificationRepository from '../repositories/verification';
import { getNowUTC } from '../utils/config/datetime';
import { FORGOT_PASSWORD_EXPIRE_TIME } from '../utils/constants/common';
import dayjs from 'dayjs';
import HelperService from '../utils/config/helper';
import EmailService from '../utils/helpers/mailer';
import { beforeUpdate } from '../utils/helpers/database';
import { employeeSelect } from '../utils/constants/query';
import ValidationHelper from '../utils/helpers/validation';
import ProfileEntity from '../entities/profile';
import AccountEntity from '../entities/account';
import ProfileRepository from '../repositories/profile';
import * as crypto from 'crypto';
import logger from '../utils/config/logger';

@Service()
export default class AuthService {
    @Inject() accountRepository: AccountRepository;
    @Inject() verificationRepository: VerificationRepository;
    @Inject() profileRepository: ProfileRepository;

    login = async (req: Request) => {
        const data: IBodySignin = req.body;
        const existedAccount = await ValidationHelper.validateActiveAccountByEmail(data.email, this.accountRepository);
        const comparePassword = bcryptService.comparePassword(data.password!, existedAccount.password!);

        if (!comparePassword) {
            throw new AppError(
                HTTP_RESPONSE.COMMON.BAD_REQUEST.code,
                HTTP_RESPONSE.AUTH.INCORRECT.message,
                HTTP_RESPONSE.AUTH.INCORRECT.code
            );
        }

        const token = jwtService.generateToken({
            id: existedAccount.id,
            role: existedAccount.role
        });

        const loginInfo = {
            account: {
                id: existedAccount.id
            },
            token: {
                access: token.access!,
                refresh: token.refresh!
            }
        };

        return loginInfo;
    };

    signup = async (req: Request) => {
        const data: IBodySignup = req.body;
        //Check email registered
        await ValidationHelper.validateEmailAccountNotRegistered(data.email, this.accountRepository);

        //Check if email registered and deleted
        await this.checkAccountDeleted(data.email);

        const input = {
            username: data.username,
            email: data.email,
            password: await bcryptService.hashPassword(data.password),
            role: (data.role as AccountRoleEnum) || AccountRoleEnum.STAFF, // Temporary role
            status: AccountStatusEnum.ACTIVE //Temporary status
        };

        const accountCreated = await this.accountRepository.create(input);
        await this.sendSignUpEmail(data.email, data.username);

        return accountCreated;
    };

    sendSignUpEmail = async (email: string, username?: string) => {
        const title = 'Welcome to All Pro Shades';
        const emailService = EmailService.create({
            subject: title,
            sender: { name: env.SENDER_NAME, email: env.SENDER_EMAIL },
            to: [{ email: email }]
        });

        const url = `${env.FE_URL}/admin/login`;
        const emailData = {
            username: username,
            urlLogin: url,
            email: email
        };

        await emailService.compose(TemplateEmailPathEnum.SIGNUP_SUCCESS, emailData);
    };

    forgotPassword = async (req: Request) => {
        const input: IBodyForgotPassword = req.body;
        const baseFrontendUrl = env.FE_URL;
        const existedAccount = await ValidationHelper.validateActiveAccountByEmail(input.email, this.accountRepository);

        // Start a transaction using the entity manager
        return await database.transaction(async (entityManager: EntityManager) => {
            const now = getNowUTC();
            const expiredAt = dayjs(now).add(FORGOT_PASSWORD_EXPIRE_TIME, 'minutes').toDate();

            // Create a new verification code
            const passwordResetCode = HelperService.generateRandomCode(20);

            // Delete old verification
            await this.verificationRepository.deleteBy({
                accountId: existedAccount.id,
                type: VerifyCodeTypeEnum.FORGOT_PASSWORD
            });

            const data = {
                code: passwordResetCode,
                type: VerifyCodeTypeEnum.FORGOT_PASSWORD,
                accountId: Number(existedAccount.id),
                expiredAt: expiredAt
            };

            const result = await this.verificationRepository.create(data);

            //#region Send email
            const title = 'Reset Password';
            const emailService = EmailService.create({
                subject: title,
                sender: { name: env.SENDER_NAME, email: env.SENDER_EMAIL },
                to: [{ email: input.email }]
            });

            const url = `${baseFrontendUrl}/admin/reset-password?code=${data.code}`;
            const contentResetPassword = 'admin/auth:contentResetPassword';
            const resetPassword = 'admin/auth:resetPassword';
            const emailData = {
                content: contentResetPassword,
                urlResetPassword: url,
                resetPassword: resetPassword
            };

            await emailService.compose(TemplateEmailPathEnum.FORGOT_PASSWORD, emailData);
        });
    };

    createNewPassword = async (req: Request) => {
        const input = req.body;

        //#region Validate
        const verification = await this.verificationRepository.findOne(
            { code: input.code },
            { id: true, accountId: true, expiredAt: true }
        );

        if (!verification) {
            throw new AppError(
                HTTP_RESPONSE.COMMON.BAD_REQUEST.code,
                HTTP_RESPONSE.AUTH.INCORRECT.message,
                HTTP_RESPONSE.COMMON.BAD_REQUEST.code
            );
        }

        const now = getNowUTC();
        if (now.isAfter(verification.expiredAt)) {
            this.verificationRepository.softDeleteById(verification.id);

            throw new AppError(
                HTTP_RESPONSE.COMMON.BAD_REQUEST.code,
                HTTP_RESPONSE.AUTH.INVALID_CODE.message,
                HTTP_RESPONSE.COMMON.BAD_REQUEST.code
            );
        }

        if (input.password !== input.confirmPassword) {
            throw new AppError(
                HTTP_RESPONSE.COMMON.BAD_REQUEST.code,
                HTTP_RESPONSE.AUTH.INCORRECT.message,
                HTTP_RESPONSE.COMMON.BAD_REQUEST.code
            );
        }

        return await database.transaction(async (entityManager: EntityManager) => {
            const inputUpdateNewPassword: IBodyCreateNewPassword = {};
            if (input.password) {
                inputUpdateNewPassword.password = bcryptService.hashPassword(input.password);
            }

            const updateData = beforeUpdate(inputUpdateNewPassword, req);
            const [accountResult] = await Promise.all([
                this.accountRepository.updateById(Number(verification.accountId), updateData),

                this.verificationRepository.softDeleteById(verification.id)
            ]);

            return {
                accountId: accountResult
            };
        });
    };

    getUserLogin = async (req: Request): Promise<AccountEntity> => {
        const userLoginId = req.session?.account?.id;
        if (!userLoginId) {
            throw new AppError(HTTP_RESPONSE.COMMON.UNAUTHORIZED.code, HTTP_RESPONSE.COMMON.UNAUTHORIZED.message);
        }

        const user = await this.accountRepository.findOneCustom({
            where: { id: Number(userLoginId) },
            relations: ['profile', 'profile.avatar'],
            select: employeeSelect
        });

        if (!user) {
            throw new AppError(HTTP_RESPONSE.COMMON.NOT_FOUND.code, HTTP_RESPONSE.AUTH.ACCOUNT_NOT_FOUND.message);
        }

        return user;
    };

    checkAccountDeleted = async (email: string) => {
        const accountDeleted = await this.accountRepository.getAccountDeletedByEmail(email);
        if (accountDeleted) {
            throw new AppError(
                HTTP_RESPONSE.COMMON.BAD_REQUEST.code,
                HTTP_RESPONSE.AUTH.ALREADY_EXISTS_AND_DELETED.message,
                HTTP_RESPONSE.AUTH.ALREADY_EXISTS_AND_DELETED.code
            );
        }
    };

    restoreDeletedAccount = async (req: Request) => {
        const email = req.body.email;
        const labelLog = '[service/auth.ts] [restoreDeletedAccount]';
        const accountDeleted = await this.accountRepository.getAccountDeletedByEmail(email);
        logger.info(`${labelLog} body -> ${JSON.stringify(req.body)}`);
        if (!accountDeleted) {
            throw new AppError(
                HTTP_RESPONSE.COMMON.BAD_REQUEST.code,
                HTTP_RESPONSE.AUTH.INCORRECT.message,
                HTTP_RESPONSE.AUTH.INCORRECT.code
            );
        }
        logger.info(`${labelLog} body -> ${JSON.stringify(accountDeleted)}`);

        const newPassword = HelperService.generateRandomCode(12);
        const restoreData = {
            deletedAt: null,
            deletedBy: null
        };

        return await database.transaction(async (entityManager: EntityManager) => {
            const profileTransaction = entityManager.getRepository(ProfileEntity);
            const accountTransaction = entityManager.getRepository(AccountEntity);

            //Restore account
            const restoreAccountData = beforeUpdate(
                {
                    password: await bcryptService.hashPassword(newPassword),
                    ...restoreData
                },
                req
            );
            await accountTransaction.update(accountDeleted.id, restoreAccountData);

            //Restore profile
            const profileDeleted = await this.profileRepository.getProfileDeletedByAccountId(accountDeleted.id);
            if (profileDeleted) await profileTransaction.update(profileDeleted.id, beforeUpdate(restoreData, req));

            //Send email
            await this.sendRestoreAccountEmail(email, newPassword, accountDeleted.username);

            return {
                ...accountDeleted,
                ...restoreData
            };
        });
    };

    sendRestoreAccountEmail = async (email: string, password: string, username?: string) => {
        const title = 'APS - Account Restoration Successful';
        const emailService = EmailService.create({
            subject: title,
            sender: { name: env.SENDER_NAME, email: env.SENDER_EMAIL },
            to: [{ email: email }]
        });

        const url = `${env.FE_URL}/admin/login`;
        const emailData = {
            username: username,
            urlLogin: url,
            email: email,
            password: password
        };

        await emailService.compose(TemplateEmailPathEnum.RESTORE_DELETED_ACCOUNT, emailData);
    };
}
