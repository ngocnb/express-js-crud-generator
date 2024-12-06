import { DataSource, EntityManager, EntityTarget, ObjectLiteral } from 'typeorm';
import env from './env';
import logger from './logger';
import configServer from './config-server';

type TransactionCallback<T> = (entityManager: EntityManager) => Promise<T>;

const connection = new DataSource({
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/../../entities/*.{js,ts}`],
  ssl: configServer.isLocalEnv
    ? false
    : {
        rejectUnauthorized: false,
      },
  migrations: [`${__dirname}/../../database/migrations/*.ts`],
});

const connect = async () => {
  try {
    await connection.initialize();
    logger.info('Database connect success');
  } catch (error: any) {
    logger.error(`Database connect failed by reason ${error.message}`);
    throw new Error('Database connect failed');
  }
};

const getRepository = <Entity extends ObjectLiteral>(entity: EntityTarget<Entity>) => {
  return connection.getRepository(entity);
};

const transaction = async <T>(callback: TransactionCallback<T>): Promise<T> => {
  const result = await connection.transaction(async (entityManager: EntityManager) => {
    return callback(entityManager);
  });

  return result;
};

export default {
  connect,
  getRepository,
  transaction,
  connection,
};
