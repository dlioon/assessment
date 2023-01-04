import { registerAs } from '@nestjs/config';

import { STRIPE_CONFIG } from '../constants/stripe.constants';

export const stripeConfig = registerAs(STRIPE_CONFIG, () => ({
  secretKey: process.env.STRIPE_SECRET_KEY,
  webhookSecretKey: process.env.STRIPE_SECRET_KEY,
}));
