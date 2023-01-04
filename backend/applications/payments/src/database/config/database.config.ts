import { registerAs } from '@nestjs/config';

import { DATABASE_CONFIG } from '../constants/database.constants';

export const databaseConfig = registerAs(DATABASE_CONFIG, () => ({
  uri: `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_ROOT_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}?directConnection=true&authSource=admin`,
}));
