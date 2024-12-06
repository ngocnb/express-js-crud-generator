export const MIGRATION_DEFAULT_COLUMNS = [
  {
    name: 'created_by',
    type: 'bigint',
    isNullable: true,
  },
  {
    name: 'updated_by',
    type: 'bigint',
    isNullable: true,
  },
  {
    name: 'deleted_by',
    type: 'bigint',
    isNullable: true,
  },
  {
    name: 'created_at',
    type: 'timestamptz',
    isNullable: true,
    default: 'now()',
  },
  {
    name: 'updated_at',
    type: 'timestamptz',
    isNullable: true,
    default: 'now()',
  },
  {
    name: 'deleted_at',
    type: 'timestamptz',
    isNullable: true,
  },
];

export const MIGRATION_DEFAULT_FOREIGN_KEYS = [
  {
    name: 'FK_Created_by_Accounts_Id',
    columnNames: ['created_by'],
    referencedColumnNames: ['id'],
    referencedTableName: 'accounts',
  },
  {
    name: 'FK_Updated_by_Accounts_Id',
    columnNames: ['updated_by'],
    referencedColumnNames: ['id'],
    referencedTableName: 'accounts',
  },
  {
    name: 'FK_Deleted_by_Accounts_Id',
    columnNames: ['deleted_by'],
    referencedColumnNames: ['id'],
    referencedTableName: 'accounts',
  },
];