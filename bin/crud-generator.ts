#!/usr/bin/env node
import * as path from 'path';
import generateCRUD from '../src/crud-generator';

const args = process.argv.slice(2);

if (args.length < 1) {
    console.error('Usage: crud-generator <entity.json>');
    process.exit(1);
}

const entityPath = path.resolve(args[0]);

generateCRUD(entityPath)
    .then(() => console.log('CRUD generation completed successfully.'))
    .catch((error:any) => {
        console.error('Error generating CRUD:', error);
        process.exit(1);
    });
