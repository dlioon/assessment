import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TransactionFor } from 'nest-transact';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { Car } from '../entities/car.entity';
import { FindAllDto } from '../dtos/find-all.dto';

@Injectable()
export class CarService extends TransactionFor<CarService> {
  constructor(
    @InjectRepository(Car) private readonly repo,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef);
  }

  findAll({ limit = 10, page = 1 }: FindAllDto): Promise<Pagination<Car>> {
    return paginate<Car>(this.repo, {
      limit,
      page,
    });
  }

  save(params: Car): Promise<Car> {
    return this.repo.save(params);
  }

  find(params: any) {
    return this.repo.find(params);
  }
}
