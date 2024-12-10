import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { MIGRATION_DEFAULT_COLUMNS } from "../../utils/constants/database";

export class CreateProfilesTable1728443220919 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'profiles',
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
                    name: 'first_name',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'last_name',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'country_code',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'phone_number',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'address',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'postal_code',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'city',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'state',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                ...MIGRATION_DEFAULT_COLUMNS,
                ],
                foreignKeys: [
                    {
                      name: 'fk_account_id',
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
        await queryRunner.dropTable('profiles');
    }

}
