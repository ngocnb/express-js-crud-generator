import { Column, Entity } from 'typeorm';
import BaseModel from './base-model';
import { VerifyCodeTypeEnum } from '../utils/enum/base';

@Entity({ name: 'verifications', schema: 'public' })
export default class VerificationEntity extends BaseModel {
    @Column({ name: 'code', type: 'varchar', length: 64 })
    code: string;

    @Column({
        name: 'expired_at',
        type: 'timestamptz'
    })
    expiredAt: Date;

    @Column({ name: 'type', type: 'varchar', length: 256 })
    type: VerifyCodeTypeEnum;

    @Column({ name: 'account_id', type: 'bigint' })
    accountId: number;
}
