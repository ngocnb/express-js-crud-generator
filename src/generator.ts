import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import { registerHandlebarsHelper } from './helpers/handlebars';
import * as StringHelpers from './helpers/string';

registerHandlebarsHelper();

function ensureBaseFilesExist() {
    const baseFiles = [
        {
            template: path.join(__dirname, 'templates', 'base-entity.hbs'),
            output: path.join(process.cwd(), 'src', 'entities', 'base.ts')
        },
        {
            template: path.join(__dirname, 'templates', 'base-repository.hbs'),
            output: path.join(process.cwd(), 'src', 'repositories', 'base.ts')
        },
        {
            template: path.join(__dirname, 'templates', 'base-validation.hbs'),
            output: path.join(process.cwd(), 'src', 'validation', 'common.ts')
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
            template: 'entity.hbs',
            dir: 'entities'
        },
        {
            template: 'interface.hbs',
            dir: 'interfaces'
        },
        {
            template: 'controller.hbs',
            dir: 'controllers'
        },
        {
            template: 'repository.hbs',
            dir: 'repositories'
        },
        {
            template: 'service.hbs',
            dir: 'services'
        },
        {
            template: 'validation.hbs',
            dir: 'validation'
        },
        {
            template: 'route.hbs',
            dir: 'routes'
        }
    ];

    files.forEach((file) => {
        const templatePath = path.join(templatesDir, file.template);
        const outputDir = path.join(srcDir, file.dir);
        fs.mkdirSync(outputDir, { recursive: true });
        const nameSnakeCase = StringHelpers.toSnakeCase(name);
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
            nameVariablePlural: StringHelpers.uncapitalizeFirstLetter(StringHelpers.toPlural(name)),
            nameSnakeCase: nameSnakeCase,
            nameSnakeCaseUpper: nameSnakeCase.toUpperCase(),
            namePlural: StringHelpers.toPlural(name),
            nameKebabCase: StringHelpers.toKebabCase(name),
            nameKebabCasePlural: StringHelpers.toKebabCase(StringHelpers.toPlural(name))
        });

        fs.writeFileSync(outputPath, content);
        console.log(`Generated file: ${outputPath}`);
    });

    updateRoutesIndex(name);
    updateDIConfig(name);

    return Promise.resolve();
}

/**
 * Updates the src/routes/index.ts file to include the new entity's route.
 *
 * @param entityName - The name of the entity (e.g., "Tag").
 */
function updateRoutesIndex(entityName: string): void {
    const nameVariable = StringHelpers.uncapitalizeFirstLetter(entityName);
    const nameKebabCasePlural = StringHelpers.toKebabCase(StringHelpers.toPlural(entityName));
    const nameSnakeCase = StringHelpers.toSnakeCase(entityName);
    const filePath = path.resolve(process.cwd(), 'src', 'routes', 'index.ts');
    const routeName = `${nameVariable}Route`;
    const routePath = `./${nameSnakeCase}`;
    const routerUseLine = `router.use('/${nameKebabCasePlural}', checkLogin, ${routeName});`;

    try {
        let data = fs.readFileSync(filePath, 'utf-8');

        // Check and add the import line if it doesn't exist
        const importLine = `import ${routeName} from '${routePath}';`;
        // Add the import line if it doesn't exist
        if (!data.includes(importLine)) {
            const importSectionMatch = data.match(/^(import .*\n)+/);
            if (importSectionMatch) {
                const [importSection] = importSectionMatch;
                data = data.replace(importSection, `${importSection}${importLine}\n`);
            } else {
                // If no imports exist, prepend the import at the beginning
                data = `${importLine}\n${data}`;
            }
        }

        // Check and add the router.use line if it doesn't exist
        if (!data.includes(routerUseLine)) {
            data = data.replace(/export default router;/, `${routerUseLine}\n\nexport default router;`);
        }

        // Write the updated data back to the file
        fs.writeFileSync(filePath, data, 'utf-8');
        console.log(`Routes for ${entityName} updated successfully!`);
    } catch (error) {
        console.error(`Error updating routes for ${entityName}:`, error);
    }
}

function updateDIConfig(entityName: string): void {
    const nameVariable = StringHelpers.uncapitalizeFirstLetter(entityName);
    const nameSnakeCase = StringHelpers.toSnakeCase(entityName);
    const filePath = path.resolve(process.cwd(), 'src', 'utils', 'config', 'di.ts');

    try {
        let data = fs.readFileSync(filePath, 'utf-8');

        // Define import lines
        const controllerImport = `import ${entityName}Controller from '../../controllers/${nameSnakeCase}';`;
        const repositoryImport = `import ${entityName}Repository from '../../repositories/${nameSnakeCase}';`;
        const serviceImport = `import ${entityName}Service from '../../services/${nameSnakeCase}';`;

        // Add import lines if they don't exist
        const importLines = [controllerImport, repositoryImport, serviceImport];
        importLines.forEach((importLine) => {
            if (!data.includes(importLine)) {
                const importSectionMatch = data.match(/^(import .*\n)+/);
                if (importSectionMatch) {
                    const [importSection] = importSectionMatch;
                    data = data.replace(importSection, `${importSection}${importLine}\n`);
                } else {
                    data = `${importLine}\n${data}`;
                }
            }
        });

        // Update the controllers, services, and repositories objects
        // Function to add new line to the object with proper formatting
        const addToObject = (blockName: string, newLine: string) => {
            const blockMatch = data.match(new RegExp(`const ${blockName} = \\{([\\s\\S]*?)\\};`));
            if (blockMatch) {
                const [blockContent] = blockMatch;

                // Avoid duplicate entries in the block
                if (!blockContent.includes(newLine)) {
                    // Add comma if not already there and format
                    const formattedLine = newLine.includes(',') ? newLine : `${newLine},`;
                    if (blockContent.includes('{}')) {
                        // Replace empty block with formatted line
                        const updatedBlock = blockContent.replace(
                            /\{\s*\}/, // Replace empty block
                            `{\n    ${formattedLine}\n}`
                        );
                        data = data.replace(blockContent, updatedBlock);
                    } else {
                        // Append formatted line with a comma
                        const updatedBlock = blockContent.replace(
                            /\{\n([\s\S]*?)\n\}/, // Find the existing block content
                            `{\n$1\n    ${formattedLine}\n}`
                        );
                        data = data.replace(blockContent, updatedBlock);
                    }
                }
            } else {
                // Add the block if it doesn't exist
                const exportMatch = data.match(/export \{.*\};/);
                const blockDeclaration = `const ${blockName} = {\n    ${newLine},\n};\n\n`;
                if (exportMatch) {
                    data = data.replace(exportMatch[0], `${blockDeclaration}${exportMatch[0]}`);
                } else {
                    data += `\n${blockDeclaration}`;
                }
            }
        };

        addToObject('controllers', `${nameVariable}: Container.get(${entityName}Controller)`);
        addToObject('services', `${nameVariable}: Container.get(${entityName}Service)`);
        addToObject('repositories', `${nameVariable}: Container.get(${entityName}Repository)`);

        // Write the updated data back to the file
        fs.writeFileSync(filePath, data, 'utf-8');
        console.log(`DI config for ${entityName} updated successfully!`);
    } catch (error) {
        console.error(`Error updating DI config for ${entityName}:`, error);
    }
}

export default generateCRUD;
