import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { PaymentResolver } from './resolvers/payment.resolver';
import { PaymentService } from './services/payment.service';
import {
  PAYMENT_CONFIG,
  PAYMENT_SERVICE_NAME,
} from './constants/payment.constants';
import { PaymentController } from './controllers/payment.controller';
import { NumberModule } from '../numbers/number.module';
import { paymentConfig } from './config/payment.config';

@Module({
  controllers: [PaymentController],
  imports: [
    ConfigModule.forFeature(paymentConfig),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: PAYMENT_SERVICE_NAME,
        useFactory: async (configService: ConfigService) =>
          configService.get(PAYMENT_CONFIG),
        inject: [ConfigService],
      },
    ]),
    NumberModule,
  ],
  providers: [PaymentResolver, PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
