import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CommandService } from '@app/command';

import {
  NUMBER_SERVICE_NAME,
  NumberAction,
  NumberRoute,
} from '../constants/number.constants';

@Injectable()
export class NumberService extends CommandService<NumberRoute, NumberAction> {
  constructor(
    @Inject(NUMBER_SERVICE_NAME) private readonly numberService: ClientProxy,
  ) {
    super(numberService);
  }

  sellNumber(data) {
    return this.send(
      { module: NumberRoute.NUMBER, cmd: NumberAction.SELL_NUMBER },
      data,
    );
  }
}
