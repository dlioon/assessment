import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

import { NUMBER_CONFIG } from '../constants/number.constants';

export const numberConfig = registerAs(NUMBER_CONFIG, () => ({
  transport: Transport.TCP,
  options: {
    host: process.env.MODULE_NUMBERS_HOST,
    port: process.env.MODULE_NUMBERS_PORT,
  },
}));
