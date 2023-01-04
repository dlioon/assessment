import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

import { stripeConfig } from './config/stripe.config';
import { StripeService } from './services/stripe.service';
import { STRIPE, STRIPE_CONFIG } from './constants/stripe.constants';

@Global()
@Module({
  imports: [ConfigModule.forFeature(stripeConfig)],
  providers: [
    {
      provide: STRIPE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new Stripe(configService.get(STRIPE_CONFIG).secretKey, {
          apiVersion: '2022-11-15',
        }),
    },
    StripeService,
  ],
  exports: [StripeService],
})
export class StripeModule {}
