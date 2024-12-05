#!/usr/bin/env ts-node
import * as path from 'path';
import generateCRUD from '../lib/generator';

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: crud-generator <entity.json>');
  process.exit(1);
}

const entityPath = path.resolve(args[0]);
generateCRUD(entityPath);