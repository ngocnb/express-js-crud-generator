import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { AccountRoleEnum, AccountStatusEnum } from '../utils/enum/base';
import BaseModel from './base-model';
import ProfileEntity from './profile';

@Entity({ name: 'accounts', schema: 'public' })
export default class AccountEntity extends BaseModel {
    @Column({ name: 'email', type: 'text', unique: true })
    email?: string;

    @Column({ name: 'username', type: 'varchar', length: 100 })
    username?: string;

    @Column({ name: 'password', type: 'text' })
    password?: string;

    @Column({ name: 'role', type: 'varchar', length: 100, nullable: false })
    role: AccountRoleEnum;

    @Column({ name: 'status', type: 'varchar', length: 100, default: AccountStatusEnum.INACTIVE })
    status: AccountStatusEnum;

    @Column({ name: 'enrolled', type: 'date', default: new Date() })
    enrolled?: AccountStatusEnum;

    @OneToOne(() => ProfileEntity, (profile) => profile.account)
    profile: ProfileEntity;
}
