import { DeepPartial, EntityTarget, FindManyOptions, FindOneOptions, Repository, ObjectLiteral } from 'typeorm';
import database from '../utils/config/database';

export class BaseRepository<T extends ObjectLiteral> {
    protected repository: Repository<T>;

    constructor(entity: EntityTarget<T>) {
        this.repository = database.getRepository(entity);
    }

    async create(data: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(data);
        return await this.repository.save(entity);
    }

    async findOne(options: FindOneOptions<T>): Promise<T | null> {
        return await this.repository.findOne(options);
    }

    async find(options?: FindManyOptions<T>): Promise<T[]> {
        return await this.repository.find(options);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async updateById(id: number, data: DeepPartial<T>): Promise<void> {
        await this.repository.update(id, data);
    }
}
