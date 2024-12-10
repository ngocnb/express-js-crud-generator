import * as fs from 'fs';
import * as path from 'path';

function generateMigration(entityFilePath: string): Promise<any> {
    const entityData = JSON.parse(fs.readFileSync(entityFilePath, 'utf8'));
    const outputDir = path.join(process.cwd(), 'src', 'database', 'migrations');
    fs.mkdirSync(outputDir, { recursive: true });
    const { name, tableName, fields } = entityData;
    const dateNow = Date.now();

    // add id to fields
    fields.unshift({
        name: 'id',
        type: 'bigserial',
        is_primary: true
    });

    const columns = fields
        .map((field: any) => {
            let fieldDefinition = `\n                {
                    name: '${field.name}',
                    type: '${field.type}',`;
            if (field.max_length) {
                fieldDefinition += `\n                    length: '${field.max_length}',`;
            }
            if (field.nullable !== undefined) {
                fieldDefinition += `\n                    isNullable: ${field.nullable},`;
            }
            if (field.default !== undefined) {
                fieldDefinition += `\n                    default: ${JSON.stringify(field.default)},`;
            }
            if (field.is_unique !== undefined) {
                fieldDefinition += `\n                    isUnique: ${JSON.stringify(field.is_unique)},`;
            }
            if (field.is_primary !== undefined) {
                fieldDefinition += `\n                    isPrimary: ${JSON.stringify(field.is_primary)},`;
            }
            fieldDefinition += `\n                },`;
            return fieldDefinition;
        })
        .join('');

    const migrationContent = `
import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { MIGRATION_DEFAULT_COLUMNS, MIGRATION_DEFAULT_FOREIGN_KEYS } from "../../utils/constants/database";
import { AccountStatusEnum } from "../../utils/enum/base";

export class Create${name}Table${dateNow} implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: '${tableName}',
                columns: [
                    ${columns}
                    ...MIGRATION_DEFAULT_COLUMNS,
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('${tableName}');
    }
}`;

    const migrationFilePath = path.join(outputDir, `${dateNow}-create-${tableName}-table.ts`);
    fs.writeFileSync(migrationFilePath, migrationContent);

    console.log(`Migration created: ${migrationFilePath}`);

    return Promise.resolve();
}

export default generateMigration;
