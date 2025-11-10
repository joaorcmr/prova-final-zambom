import { DataSource } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV || 'development';
dotenv.config({ path: '.env' });
dotenv.config({ path: `.env.${nodeEnv}`, override: true });

const databaseUrl = process.env.DATABASE_URL;

let host = process.env.DATABASE_HOST;
let port = Number(process.env.DATABASE_PORT || 5432);
let username = process.env.DATABASE_USERNAME;
let password = process.env.DATABASE_PASSWORD;
let database = process.env.DATABASE_NAME;

if (databaseUrl) {
  const url = new URL(databaseUrl);
  host = url.hostname;
  port = Number(url.port || 5432);
  username = decodeURIComponent(url.username);
  password = decodeURIComponent(url.password);
  database = url.pathname.replace(/^\//, '');
}

const isProd = process.env.NODE_ENV === 'production';

export default new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: [join(__dirname, '../../migrations/*.ts')],
  entities: [join(__dirname, '../../**/*.entity.{ts,js}')],
  ssl:
    process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});
