import { Command } from 'nestjs-command';
import { Injectable, Logger } from '@nestjs/common';

import { CarService } from '../services/car.service';
import { Commands } from '../constants/car.constants';
import { CarElasticsearchService } from '../services/car-elasticsearch.service';
import { ChunkErrorType } from '../types/chunk-error.type';

interface BasicCommandOptions {
  string?: string;
  boolean?: boolean;
  number?: number;
}

@Injectable()
export class IndexCarsCommand {
  private readonly logger = new Logger(IndexCarsCommand.name);
  constructor(
    private readonly carService: CarService,
    private readonly carElasticsearchService: CarElasticsearchService,
  ) {}

  @Command({ command: Commands.INDEX_CARS })
  async run(): Promise<void> {
    // await this.carService.deleteIndex();
    await this.carElasticsearchService.createIndex();

    for (let i = 0; i < 100; i++) {
      const cars = await this.carService.find({
        skip: i * 100,
        take: 100,
      });

      const errors: ChunkErrorType[] =
        await this.carElasticsearchService.indexCars(cars);

      if (errors.length) {
        this.logger.error(errors);
      }
    }
  }
}
