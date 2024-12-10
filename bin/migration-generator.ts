#!/usr/bin/env node
import * as path from 'path';
import generateMigration from '../src/migration-generator';

const args = process.argv.slice(2);

if (args.length < 1) {
    console.error('Usage: migration-generator <entity.json>');
    process.exit(1);
}

const entityPath = path.resolve(args[0]);

generateMigration(entityPath)
    .then(() => console.log('Migration generated completed successfully.'))
    .catch((error: any) => {
        console.error('Error generating migration:', error);
        process.exit(1);
    });
