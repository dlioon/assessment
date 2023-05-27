import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { StripeModule } from '../stripe/stripe.module';
import { PaymentModule } from '../payment/payment.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './applications/payments/.env',
    }),
    DatabaseModule,
    PaymentModule,
    StripeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
