import fs from 'fs';

// Build postgres connection string from environment
const USER = process.env.PG_ENV_POSTGRES_USER || 'postgres';
const PASSWORD = process.env.PG_ENV_POSTGRES_PASSWORD || process.env.POSTGRES_PASSWORD;
const DB = process.env.pg_ENV_POSTGRES_DB || USER; // TODO: pg_ENV_POSTGRES_DB or PG_ENV_POSTGRES_DB?
const HOST = process.env.DB_HOST_OVERRIDE || 'localhost';

export const development = fs.existsSync('config/database/configs/development.json') ? // eslint-disable-line no-sync
  JSON.parse(fs.readFileSync('config/database/configs/development.json')) : // eslint-disable-line no-sync
  null;

export const production = fs.existsSync('config/database/configs/production.json') ? // eslint-disable-line no-sync
  JSON.parse(fs.readFileSync('config/database/configs/production.json')) : // eslint-disable-line no-sync
{
  dialect: 'postgres',
  user: USER,
  password: PASSWORD,
  database: DB,
  host: HOST,
  port: 5432,
};

export const test = fs.existsSync('config/database/configs/test.json') ? // eslint-disable-line no-sync
  JSON.parse(fs.readFileSync('config/database/configs/test.json')) : // eslint-disable-line no-sync
  null;

export default {
  development,
  production,
  test,
  migrations: {
    path: 'db/migrations',
  },
};
