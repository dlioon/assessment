import { Command } from 'nestjs-command';

import { CarService } from '../services/car.service';
import { Commands } from '../constants/car.constants';
import { Injectable } from '@nestjs/common';

interface BasicCommandOptions {
  string?: string;
  boolean?: boolean;
  number?: number;
}

@Injectable()
export class IndexCarsCommand {
  constructor(private readonly carService: CarService) {}

  @Command({ command: Commands.INDEX_CARS })
  async run(): Promise<void> {
    // await this.carService.deleteIndex();
    await this.carService.createIndex();

    for (let i = 0; i < 100; i++) {
      const cars = await this.carService.findMany({
        skip: i * 100,
        take: 100,
      });
      await Promise.all(cars.map((car) => this.carService.indexCar(car)));
    }
  }
}
