import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';

import { RequestPatternType } from '../../app/types/request-pattern.type';

import {
  CAR_SERVICE_NAME,
  CarAction,
  CarRoute,
} from '../constants/car.constants';

@Injectable()
export class CarService {
  constructor(
    @Inject(CAR_SERVICE_NAME) private readonly carService: ClientProxy,
  ) {}

  send(
    {
      module = CarRoute.CAR,
      cmd,
    }: Partial<RequestPatternType<CarRoute, CarAction>>,
    data,
  ) {
    return lastValueFrom(
      this.carService
        .send(
          {
            module,
            cmd,
          },
          data,
        )
        .pipe(map((resp) => resp)),
    );
  }
}
