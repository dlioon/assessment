import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { CarResolver } from './resolvers/car.resolver';
import { CarService } from './services/car.service';
import { CAR_SERVICE_NAME } from './constants/car.constants';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: CAR_SERVICE_NAME,
        useFactory: async (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('MODULE_CARS_HOST'),
            port: config.get<number>('MODULE_CARS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [CarResolver, CarService],
  exports: [CarService],
})
export class CarModule {}
