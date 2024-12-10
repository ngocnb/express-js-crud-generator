import { Column, Entity } from 'typeorm';
import BaseModel from './base-model';

@Entity({ name: 'files', schema: 'public' })
export default class FileEntity extends BaseModel {
    @Column({ name: 'business_id', type: 'bigint' })
    businessId: number;

    @Column({ name: 'url', type: 'text' })
    url: string;

    @Column({ name: 'business_type', type: 'varchar', length: 100 })
    businessType: string;

    @Column({ name: 'type', type: 'varchar', length: 100 })
    type: string;

    @Column({ name: 'size', type: 'bigint' })
    size: number;

    @Column({ name: 'resolution', type: 'varchar', length: 100 })
    resolution: string;

    @Column({ name: 'field_name', type: 'varchar', length: 100 })
    fieldName: string;

    @Column({ name: 'mimetype', type: 'varchar', length: 100 })
    mimetype: string;
}
