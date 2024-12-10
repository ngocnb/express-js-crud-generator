import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { MIGRATION_DEFAULT_COLUMNS } from "../../utils/constants/database";

export class CreateVerificationsTable1728443777173 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'verifications',
                columns: [
                {
                    name: 'id',
                    type: 'bigserial',
                    isPrimary: true,
                },
                {
                    name: 'account_id',
                    type: 'bigint',
                },
                {
                    name: 'code',
                    type: 'varchar',
                    length: '64',
                },
                {
                    name: 'type',
                    type: 'varchar',
                    length: '256',
                    isNullable: true,
                },
                {
                    name: 'expired_at',
                    type: 'timestamptz',
                    isNullable: true,
                },
                ...MIGRATION_DEFAULT_COLUMNS,
                ],
                foreignKeys: [
                    {
                      name: 'fk_account_id_accounts_id',
                      columnNames: ['account_id'],
                      referencedColumnNames: ['id'],
                      referencedTableName: 'accounts',
                    },
                ],
            }),
            true
        );
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('verifications');
    }

}
