import { Service } from 'typedi';
import ProfileEntity from '../entities/profile';
import { BaseRepository } from './base';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { FindOptionsWhere } from 'typeorm';
import FileEntity from '../entities/file';

@Service()
export default class ProfileRepository extends BaseRepository<ProfileEntity> {
  constructor() {
    super(ProfileEntity);
  }

  deleteByAccountIds = async (
    ids: Array<Number>,
    data: QueryDeepPartialEntity<ProfileEntity>,
    entity = this.repository,
  ) => {
    const result = await entity
      .createQueryBuilder()
      .update()
      .set(data)
      .where('account_id IN (:...ids)', { ids })
      .returning(['id', 'avatarId'])
      .execute();

    if (result.raw.length > 0) {
      const avatarIds = result.raw.map((profile: any) => profile.avatar_id);

      await entity
        .createQueryBuilder()
        .update(FileEntity)
        .set(data)
        .where('id IN (:...avatarIds)', { avatarIds })
        .execute();
    }
  };

  updateOne = async (
    where: FindOptionsWhere<ProfileEntity>,
    data: QueryDeepPartialEntity<ProfileEntity>,
    entity = this.repository
  ): Promise<number | undefined> => {
    const result = await entity
      .createQueryBuilder()
      .update()
      .set(data)
      .where(where)
      .returning('id')
      .execute();
    return result.raw[0];
  };

  getProfileDeletedByAccountId = async (accountId: number) => {
    const accountDeleted = await this.repository
      .createQueryBuilder()
      .withDeleted()
      .where('account_id = :accountId', { accountId: accountId })
      .andWhere('deleted_at IS NOT NULL')
      .getOne();

      return accountDeleted;
  }
}