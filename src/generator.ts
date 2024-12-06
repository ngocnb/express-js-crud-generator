import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import { registerHandlebarsHelper } from './helpers/handlebars';
import * as StringHelpers from './helpers/string';

registerHandlebarsHelper();

function ensureBaseFilesExist() {
    const baseFiles = [
        {
            template: path.join(__dirname, 'templates', 'base-entity.ts.tmp'),
            output: path.join(process.cwd(), 'src', 'entities', 'base.ts')
        },
        {
            template: path.join(__dirname, 'templates', 'base-repository.ts.tmp'),
            output: path.join(process.cwd(), 'src', 'repositories', 'base.ts')
        }
    ];

    const baseFolders = ['interfaces', 'thirdParties', 'utils'];

    baseFiles.forEach(({ template, output }) => {
        if (!fs.existsSync(output)) {
            const dir = path.dirname(output);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            const content = fs.readFileSync(template, 'utf8');
            fs.writeFileSync(output, content);
            console.log(`Created base file: ${output}`);
        } else {
            console.log(`Base file already exists: ${output}`);
        }
    });

    // for each baseFolders and folder
    // check the folder src/{folder}
    // get list of the files in {folder}
    // check if the file is existed in src/{folder} or not, if not, copy the file
}

function generateCRUD(entityFilePath: string): Promise<any> {
    ensureBaseFilesExist();

    const entityData = JSON.parse(fs.readFileSync(entityFilePath, 'utf8'));
    const { name, tableName, fields } = entityData;

    const srcDir = path.join(process.cwd(), 'src');
    fs.mkdirSync(srcDir, { recursive: true });

    const templatesDir = path.join(__dirname, 'templates');
    const files = [
        {
            template: 'entity.ts.tmp',
            dir: 'entities'
        },
        {
            template: 'interface.ts.tmp',
            dir: 'interfaces'
        },
        {
            template: 'controller.ts.tmp',
            dir: 'controllers'
        },
        {
            template: 'repository.ts.tmp',
            dir: 'repositories'
        },
        {
            template: 'service.ts.tmp',
            dir: 'services'
        }
    ];

    files.forEach((file) => {
        const templatePath = path.join(templatesDir, file.template);
        const outputDir = path.join(srcDir, file.dir);
        fs.mkdirSync(outputDir, { recursive: true });
        const nameSnakeCase = StringHelpers.convertStringToSnakeCase(name);
        const outputPath = path.join(outputDir, nameSnakeCase + '.ts');

        const template = Handlebars.compile(fs.readFileSync(templatePath, 'utf8'));
        const content = template({
            name,
            tableName: tableName || name.toLowerCase(),
            fields: fields.map((field: any) => ({
                fieldName: field.name,
                type: field.type || 'varchar',
                fieldType: field.fieldType || 'string',
                isNullable: field.nullable || false,
                maxLength: field.max_length || 0
            })),
            nameVariable: StringHelpers.uncapitalizeFirstLetter(name),
            nameSnakeCase: nameSnakeCase,
            nameSnakeCaseUpper: nameSnakeCase.toUpperCase(),
            namePlural: StringHelpers.toPlural(name)
        });

        fs.writeFileSync(outputPath, content);
        console.log(`Generated file: ${outputPath}`);
    });

    return Promise.resolve();
}

export default generateCRUD;
