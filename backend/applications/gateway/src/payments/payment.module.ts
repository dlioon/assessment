import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { PaymentResolver } from './resolvers/payment.resolver';
import { PaymentService } from './services/payment.service';
import { PAYMENT_SERVICE_NAME } from './constants/payment.constants';
import { PaymentController } from './controllers/payment.controller';
import { NumberModule } from '../numbers/number.module';

@Module({
  controllers: [PaymentController],
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: PAYMENT_SERVICE_NAME,
        useFactory: async (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('MODULE_PAYMENTS_HOST'),
            port: config.get<number>('MODULE_PAYMENTS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    NumberModule,
  ],
  providers: [PaymentResolver, PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
