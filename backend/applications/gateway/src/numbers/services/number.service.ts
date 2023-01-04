import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';

import {
  NUMBER_SERVICE_NAME,
  NumberAction,
  NumberRoute,
} from '../constants/number.constants';
import { RequestPatternType } from '../../app/types/request-pattern.type';

@Injectable()
export class NumberService {
  constructor(
    @Inject(NUMBER_SERVICE_NAME) private readonly numberService: ClientProxy,
  ) {}

  send(
    {
      module = NumberRoute.NUMBER,
      cmd,
    }: Partial<RequestPatternType<NumberRoute, NumberAction>>,
    data,
  ) {
    return lastValueFrom(
      this.numberService
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

  sellNumber(data) {
    return this.send({ cmd: NumberAction.SELL_NUMBER }, data);
  }
}
