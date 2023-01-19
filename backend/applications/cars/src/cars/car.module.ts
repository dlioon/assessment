import { Module } from '@nestjs/common';

import { ElasticsearchModule } from '@app/elasticsearch';
import { DatabaseModule } from '../database/database.module';

import { CarController } from './controllers/car.controller';
import { CarService } from './services/car.service';
import { Car } from './entities/car.entity';
import { IndexCarsCommand } from './commands/index.command';

@Module({
  imports: [ElasticsearchModule, DatabaseModule.forFeature([Car])],
  controllers: [CarController],
  providers: [CarService, IndexCarsCommand],
})
export class CarModule {}
