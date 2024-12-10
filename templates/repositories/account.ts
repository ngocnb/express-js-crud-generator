import { Inject, Service } from 'typedi';
import { DeepPartial, EntityManager, FindOptionsWhere } from 'typeorm';
import AccountEntity from '../entities/account';
import ProfileEntity from '../entities/profile';
import { IDetailAccount, IInputGetAllAccounts } from '../interfaces/account';
import { IPagination } from '../interfaces/common';
import { IGetDetailUsers } from '../interfaces/user';
import database from '../utils/config/database';
import logger from '../utils/config/logger';
import { BaseRepository } from './base';
import ProfileRepository from './profile';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import FileEntity from '../entities/file';

@Service()
export default class AccountRepository extends BaseRepository<AccountEntity> {
    @Inject() profileRepository: ProfileRepository;

    constructor() {
        super(AccountEntity);
    }

    createAccount = async (payload: {
        newAccount: DeepPartial<AccountEntity>;
        newProfile: DeepPartial<ProfileEntity>;
        newAvatar: DeepPartial<FileEntity>;
    }) => {
        const labelLog = '[repositories/account.ts] [createAccount]';
        const { newAccount, newProfile, newAvatar } = payload;

        return await database.transaction<AccountEntity>(async (entityManager: EntityManager) => {
            const accountTransaction = entityManager.getRepository(AccountEntity);
            const profileTransaction = entityManager.getRepository(ProfileEntity);
            const fileTransaction = entityManager.getRepository(FileEntity);

            const accountCreateTemp = accountTransaction.create(newAccount);
            const accountCreated = await accountTransaction.save(accountCreateTemp);
            logger.debug(`${labelLog} create accountId -> ${accountCreated.id} successful`);

            let avatarId = null;
            let newProfileObj = newProfile;

            if (newAvatar && Object.keys(newAvatar).length > 0) {
                const avatarCreateTemp = fileTransaction.create(newAvatar);
                const avatarCreated = await fileTransaction.save(avatarCreateTemp);

                avatarId = Number(avatarCreated.id);
                newProfileObj = {
                    ...newProfile,
                    avatarId: Number(avatarCreated.id)
                };
            }

            if (newProfileObj && Object.keys(newProfileObj).length > 0) {
                const profileCreateTemp = profileTransaction.create({
                    accountId: accountCreated.id,
                    ...newProfileObj
                });

                const profileCreated = await profileTransaction.save(profileCreateTemp);
                logger.debug(`${labelLog} create profileId -> ${profileCreated.id} successful`);
            }

            return accountCreated;
        });
    };

    getListUsers = async (payload: { pagination: IPagination }) => {
        const { pagination } = payload;

        const queryBase = this.repository
            .createQueryBuilder('a') // a is accounts
            .leftJoin(ProfileEntity, 'p', 'p.accountId = a.id') // p is profiles
            .leftJoin(FileEntity, 'f', 'f.id = p.avatarId') // f is files
            .select(['a.id::INTEGER "id"', 'a.role "role"', 'a.status "status"', 'a.enrolled "enrolled"'])
            .addSelect([
                'p.firstName "firstName"',
                'p.lastName "lastName"',
                'p.employeeID "employeeID"',
                'p.performance "performance"',
                'f.url "avatarUrl"'
            ]);

        const result = this.getResponsePaging<IGetDetailUsers[]>(queryBase, pagination);

        return result;
    };

    getDetailAccountById = async (accountId: number) => {
        const queryBase = this.repository
            .createQueryBuilder('a') // a is accounts
            .select([
                'a.id as "id"',
                'a.email as "email"',
                'a.username as "username"',
                'a.role as "role"',
                'a.status as "status"',
                'a.enrolled as "enrolled"'
            ])
            .leftJoin(ProfileEntity, 'p', 'p.accountId = a.id')
            .leftJoin(FileEntity, 'f', 'f.id = p.avatarId')
            .addSelect([
                'p.firstName "firstName"',
                'p.lastName "lastName"',
                'p.phone_number "phoneNumber"',
                'p.address "address"',
                'p.city "city"',
                'f.url "avatarUrl"'
            ])
            .where(`a.id = ${accountId}`);

        const result = queryBase.getRawOne<IDetailAccount>();
        return result;
    };

    getAllAccounts = async (input?: IInputGetAllAccounts) => {
        const queryBuilder = this.repository
            .createQueryBuilder('a')
            .leftJoin(ProfileEntity, 'p', 'p.accountId = a.id')
            .addSelect(['p.id "profileId"'])
            .select(['a.id', 'a.email']);

        if (input?.ids) {
            queryBuilder.andWhere('a.id IN (:...ids)', { ids: input?.ids });
        }

        const accounts = await queryBuilder.getMany();

        return accounts;
    };

    deleteByIds = async (ids: Array<Number>, data: QueryDeepPartialEntity<AccountEntity>, entity = this.repository) => {
        return await entity
            .createQueryBuilder()
            .update()
            .set(data)
            .where('id IN (:...ids)', { ids })
            .returning(['id'])
            .execute();
    };

    updateOne = async (
        where: FindOptionsWhere<AccountEntity>,
        data: QueryDeepPartialEntity<AccountEntity>,
        entity = this.repository
    ): Promise<number | undefined> => {
        const result = await entity.createQueryBuilder().update().set(data).where(where).returning('id').execute();
        return result.raw[0];
    };

    getAccountDeletedByEmail = async (email: string) => {
        const accountDeleted = await this.repository
            .createQueryBuilder()
            .withDeleted()
            .where('email = :email', { email: email })
            .andWhere('deleted_at IS NOT NULL')
            .getOne();

        return accountDeleted;
    };
}
