import * as path from 'path';
import { registerAs } from '@nestjs/config';

import { DATABASE_CONFIG } from '../constants/database.constants';

export const databaseConfig = registerAs(DATABASE_CONFIG, () => ({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: process.env.DB_LOGGING === 'true' ?? false,
  migrationsTableName: 'migrations',
  synchronize: false,
  migrationsRun: true,
  autoLoadEntities: true,
  migrations: [path.resolve(__dirname, '../../**/migrations/*.{ts,js}')],
  entities: [path.resolve(__dirname, '../../**/*.entity{.ts,.js}')],
}));
