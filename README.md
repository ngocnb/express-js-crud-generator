## Installation

```
npm install @baongoc/express-js-crud-generator
```

Currently this project only supports Postgresql

## How to use

```
# generate expressjs app skeleton
npx bn-skeleton-generator

# generate crud
npx bn-crud-generator

# generate migration file
npx bn-migration-generator ./src/generators/Campsite.json
```

### Sample json

```
{
    "name": "Campsite",
    "fields": [
        { "name": "name", "type": "string", "dbType": "varchar", "nullable": false, "max_length": 255 },
        { "name": "description", "type": "string", "dbType": "text", "nullable": false },
        { "name": "location", "type": "string", "dbType": "varchar", "nullable": false, "max_length": 255 },
        { "name": "latitude", "type": "string", "dbType": "varchar", "nullable": false, "max_length": 64 },
        { "name": "longitude", "type": "string", "dbType": "varchar", "nullable": false, "max_length": 64 },
        { "name": "price", "type": "number", "dbType": "numeric(14, 2)", "nullable": false },
        { "name": "availability", "type": "Date", "dbType": "timestamptz", "nullable": false }
    ],
    "tableName": "campsites"
}
```