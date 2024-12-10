import { Inject, Service } from 'typedi';
import AccountRepository from '../repositories/account';
import AppError from '../utils/config/app-error';
import logger from '../utils/config/logger';
import { PASSWORD_DEFAULT } from '../utils/constants/common';
import { HTTP_RESPONSE } from '../utils/constants/http-response';
import BcryptHelper from '../utils/helpers/bcrypt';
import CommonHelper from '../utils/helpers/common';
import { Request } from 'express';
import database from '../utils/config/database';
import { EntityManager, ILike } from 'typeorm';
import AccountEntity from '../entities/account';
import ProfileEntity from '../entities/profile';
import { beforeCreate, beforeDelete, beforeUpdate } from '../utils/helpers/database';
import ProfileRepository from '../repositories/profile';
import bcryptService from '../utils/helpers/bcrypt';
import AuthHelper from '../utils/helpers/auth';
import { services } from '../utils/config/di';
import { BusinessFileEnum, ResolutionEnum } from '../utils/enum/common';
import { AccountRoleEnum, AccountStatusEnum, FileTypeEnum, OrderTypeEnum } from '../utils/enum/base';
import FileEntity from '../entities/file';
import { IGetListResponse, IQueryGetList } from '../interfaces/common';
import { employeeSelect } from '../utils/constants/query';
import ValidationHelper from '../utils/helpers/validation';

@Service()
export default class UserService {
  @Inject() accountRepository: AccountRepository;
  @Inject() profileRepository: ProfileRepository;

  createUser = async (req: Request) => {
    const labelLog = '[services/user.ts] [createUser]';
    const body = req.body;

    if (body.email) {
      await ValidationHelper.validateEmailAccountNotRegistered(body.email, this.accountRepository);
    }

    const passwordHashed = BcryptHelper.hashPassword(PASSWORD_DEFAULT);
    logger.debug(`${labelLog} hash password successful`);

    const file = req.file as Express.Multer.File;
    if (file) {
      const avatarData = await services.file.uploadFile({
        file,
        req,
        businessId: 2,
        businessType: BusinessFileEnum.AVATAR,
        type: FileTypeEnum.IMAGE,
        resolution: ResolutionEnum.HD,
      });

      body.file = avatarData;      
    }
    
    const { password, ...result } = await this.accountRepository.createAccount({
      newAccount: {
        username: body.username,
        email: body.email,
        password: passwordHashed,
        role: body.role,
        status: body.status ?? AccountStatusEnum.ACTIVE,
      },
      newProfile: body.profile ?? null,
      newAvatar: body.file ?? null
    });

    return {
      ...result,
      profile: body.profile
    };
  };

  getListUsers = async (payload: { query: any }): Promise<IGetListResponse<AccountEntity>> => {
    const { query } = payload;
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    let filterCondition: any = {};

    if (query.status) filterCondition['status'] = query.status;
    if (query.role) filterCondition['role'] = query.role;
    if (query.textSearch && query.textSearch.length > 0) {
      // const searchWords = query.textSearch.split(' ').filter(Boolean);
      filterCondition = [
        {username: ILike(`%${query.textSearch.trim()}%`)},
        {email: ILike(`%${query.textSearch.trim()}%`)},
        {profile: [{
          phoneNumber: ILike(`%${query.textSearch.trim()}%`),
        }]}
      ];
    }

    const orderBy: any = {};
    if (query.sortBy && query.sortType && query.sortBy.length > 0) {
      const sortFields = query.sortBy.split('.');

      if (sortFields.length === 2 && sortFields[0] === 'profile') {
        orderBy[sortFields[0]] = {
          [sortFields[1]]: query.sortType 
        };
      } else {
        orderBy[query.sortBy] = query.sortType;
      }
    } else {
      orderBy['id'] = OrderTypeEnum.DESC;
    }
    
    const data = await this.accountRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['profile', 'profile.avatar'],
      where: filterCondition,
      order: orderBy,
      select: employeeSelect,
    });

    const result = {
      responses: data[0],
      pagination: CommonHelper.pagination(Number(page), Number(limit), data[1]),
    }

    return result;
  };

  findUserById = async (req: Request): Promise<AccountEntity> => {
    //Check permission before find user
    AuthHelper.checkUserLoginRole(req, Number(req.params.id));

    const user = await this.accountRepository.findOneCustom({
      where: { id: Number(req.params.id) },
      relations: ['profile', 'profile.avatar'],
      select: employeeSelect,
    });

    if (!user) {
      throw new AppError(
        HTTP_RESPONSE.COMMON.NOT_FOUND.code,
        HTTP_RESPONSE.USER.NOT_FOUND.message
      );
    }

    return user;
  }

  updateUserById = async (req: Request) => {
    //Check email exist
    const checkEmailExist = await this.accountRepository.findOneCustom({
      where: { email: req.body.email },
    })
    
    //Check user exists
    const user = await this.findUserById(req);

    //Check permission before updating
    AuthHelper.checkUserLoginRole(req, Number(user.id));

    const input = req.body;
    const file = req.file as Express.Multer.File;
    if (checkEmailExist && checkEmailExist.id !== user.id && checkEmailExist.email === input.email) {
      throw new AppError(
        HTTP_RESPONSE.COMMON.BAD_REQUEST.code,
        HTTP_RESPONSE.USER.INVALID_EMAIL.message,
      );
    }

    return await database.transaction(async (entityManager: EntityManager) => {
      const accountTransaction = entityManager.getRepository(AccountEntity);
      const profileTransaction = entityManager.getRepository(ProfileEntity);
      const fileTransaction = entityManager.getRepository(FileEntity);

      let profileDataObj = input.profile;

      //Update profile image
      if (file) {
        const avatarData = await services.file.uploadFile({
          file,
          req,
          businessId: 2,
          businessType: BusinessFileEnum.AVATAR,
          type: FileTypeEnum.IMAGE,
          resolution: ResolutionEnum.HD,
        });

        const avatarCreatedTemp = fileTransaction.create(avatarData);
        const avatarCreated = await fileTransaction.save(avatarCreatedTemp);

        profileDataObj = {
          ...profileDataObj,
          avatarId: Number(avatarCreated.id)
        };
      }

      //Update profile
      if (profileDataObj && Object.keys(profileDataObj).length > 0) {
        const profileExist = await this.profileRepository.findOne({ accountId: Number(user.id) });

        if (!profileExist) {          
          const data = beforeCreate(profileDataObj, req);
          const profileCreateTemp = profileTransaction.create({
            accountId: user.id,
            ...data,
          });
          await profileTransaction.save(profileCreateTemp);

        } else {
          await this.profileRepository.updateOne(
            { accountId: user.id },
            beforeUpdate(profileDataObj, req),
            profileTransaction
          );
        }

        //Remove profile
        delete input.profile;
      }

      // Update account
      if (input.password) input.password = bcryptService.hashPassword(input.password);
      await this.accountRepository.updateOne(
        { id: user.id },
        beforeUpdate(input, req),
        accountTransaction
      );

      return { id: user.id };
    });
  }

  deleteUserByIds = async (req: Request) => {
    const accounts = await this.accountRepository.getAllAccounts({
      ids: req.body.ids,
    });
 
    const accountIds: Array<number> = [];

    accounts.forEach((account) => {
      accountIds.push(Number(account.id));
    });

    return await database.transaction(async (entityManager: EntityManager) => {
      const accountTransaction = entityManager.getRepository(AccountEntity);
      const profileTransaction = entityManager.getRepository(ProfileEntity);

      if (accountIds.length) {
        await this.accountRepository.deleteByIds(accountIds, beforeDelete({}, req), accountTransaction);

        await this.profileRepository.deleteByAccountIds(
          accountIds,
          beforeDelete({}, req),
          profileTransaction
        );
      }

      return { ids: accountIds };
    });
  }

  getSalesList = async (payload: { query: IQueryGetList }): Promise<IGetListResponse<AccountEntity>>  => {
    const { query } = payload;
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const orderBy: any = {};
    if (query.sortBy && query.sortType) {
      orderBy[query.sortBy] = query.sortType;
    } else {
      orderBy['id'] = OrderTypeEnum.DESC;
    }
    
    const data = await this.accountRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['profile', 'profile.avatar'],
      where: {
        role: AccountRoleEnum.FRANCHISEES,
        status: AccountStatusEnum.ACTIVE,
      },
      order: orderBy,
      select: employeeSelect,
    });

    const result = {
      responses: data[0],
      pagination: CommonHelper.pagination(Number(page), Number(limit), data[1]),
    }

    return result;
  };
}