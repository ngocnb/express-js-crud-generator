import * as fs from 'fs';
import * as path from 'path';

const templatesDir = path.join(__dirname, '..', 'templates');
const srcDir = path.join(process.cwd(), 'src');

/**
 * Recursively copies files and folders from templates to the src directory.
 */
export const syncTemplates = (): void => {
    try {
        copyRecursiveSync(templatesDir, srcDir);
        console.log('Templates synchronized successfully!');
    } catch (error) {
        console.error('Error synchronizing templates:', error);
    }
};

/**
 * Copies files and folders recursively from source to destination.
 * @param source - The source directory.
 * @param destination - The destination directory.
 */
const copyRecursiveSync = (source: string, destination: string): void => {
    if (!fs.existsSync(source)) {
        throw new Error(`Source path does not exist: ${source}`);
    }

    const items = fs.readdirSync(source);
    items.forEach((item) => {
        const sourcePath = path.join(source, item);
        const destinationPath = path.join(destination, item);

        const stats = fs.statSync(sourcePath);

        if (stats.isDirectory()) {
            if (!fs.existsSync(destinationPath)) {
                fs.mkdirSync(destinationPath);
                console.log(`Created directory: ${destinationPath}`);
            }
            copyRecursiveSync(sourcePath, destinationPath);
        } else if (!fs.existsSync(destinationPath)) {
            fs.copyFileSync(sourcePath, destinationPath);
            console.log(`Copied file: ${sourcePath} -> ${destinationPath}`);
        }
    });
};
