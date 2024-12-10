import { AccountRoleEnum, LoginTypeEnum, OsPlatformEnum } from '../utils/enum/base';

export interface ISessionAccount {
    id: number;
    role: AccountRoleEnum;
    email?: string;
    countryCode?: string;
    phoneNumber?: string;
}

export interface IPayloadToken {
    id: number;
    role: AccountRoleEnum;
}

export interface IBodyLogin {
    type: LoginTypeEnum;
    username?: string;
    password?: string;
    googleIdToken?: string;
    appleIdToken?: string;
    firebase?: {
        deviceId: string;
        token: string;
        osPlatform: OsPlatformEnum;
    };
}

export interface IBodySignin {
    email: string;
    password: string;
}

export interface IBodySignup {
    username: string;
    email: string;
    password: string;
    role?: string;
}

export interface IBodyForgotPassword {
    email: string;
}

export interface IBodyCreateNewPassword {
    code?: string;
    password?: string;
    confirmPassword?: string;
}
