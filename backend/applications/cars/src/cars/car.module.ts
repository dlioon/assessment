import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ElasticsearchModule } from '@app/elasticsearch';
import { DatabaseModule } from '../database/database.module';

import { CarController } from './controllers/car.controller';
import { CarService } from './services/car.service';
import { Car } from './entities/car.entity';
import { IndexCarsCommand } from './commands/index.command';
import { carsElasticsearchConfig } from './config/cars-elasticsearch.config';
import { CarElasticsearchService } from './services/car-elasticsearch.service';

@Module({
  imports: [
    ConfigModule.forFeature(carsElasticsearchConfig),
    ElasticsearchModule,
    DatabaseModule.forFeature([Car]),
  ],
  controllers: [CarController],
  providers: [CarService, IndexCarsCommand, CarElasticsearchService],
})
export class CarModule {}
