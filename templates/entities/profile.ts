import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AccountRoleEnum, AccountStatusEnum } from '../utils/enum/base';
import BaseModel from './base-model';
import FileEntity from './file';
import AccountEntity from './account';

@Entity({ name: 'profiles', schema: 'public' })
export default class ProfileEntity extends BaseModel {
    @Column({ name: 'account_id', type: 'bigint', nullable: false })
    accountId: number;

    @Column({ name: 'first_name', type: 'varchar', length: 100 })
    firstName?: string;

    @Column({ name: 'last_name', type: 'varchar', length: 100 })
    lastName?: string;

    @Column({ name: 'country_code', type: 'varchar', length: 100 })
    countryCode?: string;

    @Column({ name: 'phone_number', type: 'varchar', length: 100 })
    phoneNumber?: string;

    @Column({ name: 'address', type: 'varchar', length: 100 })
    address?: string;

    @Column({ name: 'postal_code', type: 'varchar', length: 100 })
    postalCode?: string;

    @Column({ name: 'city', type: 'varchar', length: 100 })
    city?: string;

    @Column({ name: 'state', type: 'varchar', length: 100 })
    state?: string;

    @Column({ name: 'employee_id', type: 'varchar', length: 64 })
    employeeID?: string;

    @Column({ name: 'performance', type: 'varchar', length: 64 })
    performance?: string;

    @Column({ name: 'gender', type: 'varchar', length: 64 })
    gender?: string;

    @Column({ name: 'nationality', type: 'varchar', length: 64 })
    nationality?: string;

    @Column({ name: 'join_date', type: 'date', default: new Date() })
    joinDate?: Date;

    @Column({ name: 'avatar_id', type: 'bigint', nullable: true })
    avatarId: number;

    @OneToOne(() => FileEntity)
    @JoinColumn({ name: 'avatar_id' })
    avatar: FileEntity;

    @OneToOne(() => AccountEntity)
    @JoinColumn({ name: 'account_id' })
    account: AccountEntity;
}
