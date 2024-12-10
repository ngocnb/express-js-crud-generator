import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { MIGRATION_DEFAULT_COLUMNS, MIGRATION_DEFAULT_FOREIGN_KEYS } from "../../utils/constants/database";
import { AccountStatusEnum } from "../../utils/enum/base";

export class CreateAccountsTable1728441911427 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'accounts',
                columns: [
                {
                    name: 'id',
                    type: 'bigserial',
                    isPrimary: true,
                },
                {
                    name: 'email',
                    type: 'text',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    length: '100',
                    default: "'INACTIVE'",
                    isNullable: true,
                },
                {
                    name: 'role',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'enrolled',
                    type: 'date',
                    isNullable: true,
                    default: 'now()',
                },
                ...MIGRATION_DEFAULT_COLUMNS,
                ],
            }),
            true
        );
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('accounts');
    }

}
