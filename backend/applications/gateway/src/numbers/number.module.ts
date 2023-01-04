import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { NUMBER_SERVICE_NAME } from './constants/number.constants';
import { NumberResolver } from './resolvers/number.resolver';
import { NumberService } from './services/number.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: NUMBER_SERVICE_NAME,
        useFactory: async (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('MODULE_NUMBERS_HOST'),
            port: config.get<number>('MODULE_NUMBERS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [NumberResolver, NumberService],
  exports: [NumberService],
})
export class NumberModule {}
