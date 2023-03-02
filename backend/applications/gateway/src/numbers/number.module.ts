import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import {
  NUMBER_CONFIG,
  NUMBER_SERVICE_NAME,
} from './constants/number.constants';
import { NumberResolver } from './resolvers/number.resolver';
import { NumberService } from './services/number.service';
import { numberConfig } from './config/number.config';

@Module({
  imports: [
    ConfigModule.forFeature(numberConfig),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: NUMBER_SERVICE_NAME,
        useFactory: async (configService: ConfigService) =>
          configService.get(NUMBER_CONFIG),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [NumberResolver, NumberService],
  exports: [NumberService],
})
export class NumberModule {}
