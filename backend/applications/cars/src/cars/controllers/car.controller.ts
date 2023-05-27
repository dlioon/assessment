import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Pagination } from 'nestjs-typeorm-paginate';

import { CarAction, CAR_ROUTE } from '../constants/car.constants';
import { Car } from '../entities/car.entity';
import { FindAllDto } from '../dtos/find-all.dto';
import { CarElasticsearchService } from '../services/car-elasticsearch.service';

@Controller()
export class CarController {
  constructor(
    private readonly carElasticsearchService: CarElasticsearchService,
  ) {}

  @MessagePattern({ module: CAR_ROUTE, cmd: CarAction.FIND_ALL })
  async find(params: FindAllDto): Promise<Pagination<Car>> {
    const { total, rows } = await this.carElasticsearchService.search(params);

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
}
