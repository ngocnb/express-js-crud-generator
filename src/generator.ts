import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

function ensureBaseFilesExist() {
    const baseFiles = [
        {
            template: path.join(__dirname, 'templates', 'base-entity.ts'),
            output: path.join(process.cwd(), 'src', 'entities', 'base.ts')
        },
        {
            template: path.join(__dirname, 'templates', 'base-repository.ts'),
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

    const outputDir = path.join(process.cwd(), 'src', name.toLowerCase());
    fs.mkdirSync(outputDir, { recursive: true });

    const templatesDir = path.join(__dirname, 'templates');
    const files = ['entity.ts', 'controller.ts', 'repository.ts', 'service.ts'];

    files.forEach((file) => {
        const templatePath = path.join(templatesDir, file);
        const outputPath = path.join(outputDir, file.replace('entity', name.toLowerCase()));

        const template = Handlebars.compile(fs.readFileSync(templatePath, 'utf8'));
        const content = template({
            name,
            tableName: tableName || name.toLowerCase(),
            fields: fields.map((field: any) => ({
                fieldName: field.name,
                type: field.type || 'varchar',
                fieldType: field.tsType || 'string',
                isNullable: field.nullable || false
            }))
        });

        fs.writeFileSync(outputPath, content);
    });

    console.log(`CRUD for ${name} generated in ${outputDir}`);
    return Promise.resolve();
}

export default generateCRUD;
