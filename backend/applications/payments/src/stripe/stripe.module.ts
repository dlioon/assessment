import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

import { PaymentModule } from '../payment/payment.module';
import { stripeConfig } from './config/stripe.config';
import { StripeService } from './services/stripe.service';
import { STRIPE, STRIPE_CONFIG } from './constants/stripe.constants';
import { StripeController } from './controllers/stripe.controller';

@Global()
@Module({
  imports: [ConfigModule.forFeature(stripeConfig), PaymentModule],
  providers: [
    {
      provide: STRIPE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new Stripe(configService.get(STRIPE_CONFIG).secretKey, {
          apiVersion: configService.get(STRIPE_CONFIG).apiVersion,
        }),
    },
    StripeService,
  ],
  exports: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}
