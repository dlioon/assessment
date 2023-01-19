import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Pagination } from 'nestjs-typeorm-paginate';

import { CarAction, CAR_ROUTE } from '../constants/car.constants';
import { CarService } from '../services/car.service';
import { Car } from '../entities/car.entity';
import { FindAllDto } from '../dtos/find-all.dto';

@Controller()
export class CarController {
  constructor(private readonly carService: CarService) {}

  @MessagePattern({ module: CAR_ROUTE, cmd: CarAction.FIND_ALL })
  async findAll(params: FindAllDto): Promise<Pagination<Car>> {
    if (params.text) {
      const { total, rows } = await this.carService.search(params);

      return {
        items: rows,
        meta: {
          itemCount: params.limit,
          totalItems: total,
          itemsPerPage: params.limit,
          currentPage: params.page,
        },
      };
    }

    return this.carService.findAll(params);
  }
}
