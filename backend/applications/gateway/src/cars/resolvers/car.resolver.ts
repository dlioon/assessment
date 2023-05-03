import { Resolver, Query, Args } from '@nestjs/graphql';

import { Auth } from '../../auth/decorators/auth.decorator';

import { CarService } from '../services/car.service';
import { CarAction } from '../constants/car.constants';
import { CarList } from '../entities/list.entity';
import { CarFindAllInput } from '../input/find-all.input';

@Resolver(() => CarList)
export class CarResolver {
  constructor(private readonly carService: CarService) {}

  @Auth()
  @Query(() => CarList)
  findAllCars(@Args('input') input: CarFindAllInput) {
    return this.carService.send({ cmd: CarAction.FIND_ALL }, input);
  }
}
