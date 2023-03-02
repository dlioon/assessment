import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

import { PAYMENT_CONFIG } from '../constants/payment.constants';

export const paymentConfig = registerAs(PAYMENT_CONFIG, () => ({
  transport: Transport.TCP,
  options: {
    host: process.env.MODULE_PAYMENTS_HOST,
    port: process.env.MODULE_PAYMENTS_PORT,
  },
}));
