import AccountEntity from '../entities/account';

export interface ICreateAccount {}

export interface IUpdateAccount {}

export interface IDetailAccount extends AccountEntity {
    avatarUrl: string;
}

export interface IInputGetAllAccounts {
    ids?: Array<number>;
}
