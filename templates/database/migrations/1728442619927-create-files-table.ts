import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { MIGRATION_DEFAULT_COLUMNS } from "../../utils/constants/database";

export class CreateFilesTable1728442619927 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'files',
                columns: [
                {
                    name: 'id',
                    type: 'bigserial',
                    isPrimary: true,
                },
                {
                    name: 'business_id',
                    type: 'bigint',
                    isNullable: true,
                },
                {
                    name: 'business_type',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'url',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'type',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'size',
                    type: 'bigint',
                    isNullable: true,
                },
                {
                    name: 'resolution',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'field_name',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'mimetype',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                ...MIGRATION_DEFAULT_COLUMNS,
                ],
            }),
            true
        );
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('files');
    }

}
