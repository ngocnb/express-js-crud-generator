import { Container } from 'typedi';
import AuthController from '../../controllers/auth';
import AccountService from '../../services/user';
import AccountRepository from '../../repositories/account';
import ProfileRepository from '../../repositories/profile';

const controllers = {
    auth: Container.get(AuthController),
};

const services = {
    account: Container.get(AccountService),
};

const repositories = {
    account: Container.get(AccountRepository),
    profile: Container.get(ProfileRepository),
};

export { controllers, repositories, services };
