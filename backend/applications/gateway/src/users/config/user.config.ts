import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

import { USER_CONFIG } from '../constants/user.constants';

export const userConfig = registerAs(USER_CONFIG, () => ({
  transport: Transport.TCP,
  options: {
    host: process.env.MODULE_USERS_HOST,
    port: process.env.MODULE_USERS_PORT,
  },
}));
