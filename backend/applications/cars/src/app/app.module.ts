import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommandModule } from 'nestjs-command';

import { CarModule } from '../cars/car.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, CarModule, CommandModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
