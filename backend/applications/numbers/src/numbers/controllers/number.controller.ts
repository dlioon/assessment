import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DataSource } from 'typeorm';

import { NumberService } from '../services/number.service';
import { NUMBER_ROUTE, NumberAction } from '../constants/number.constants';
import { FindAllDto } from '../dtos/find-all.dto';
import { SellNumberDto } from '../dtos/sell-number.dto';
import { UpdateNumberDto } from '../dtos/update-number.dto';
import { Number } from '../entities/number.entity';
import { NumberUser } from '../entities/number-user.entity';

@Controller()
export class NumberController {
  constructor(
    private readonly numberService: NumberService,
    private readonly dataSource: DataSource,
  ) {}

  @MessagePattern({ module: NUMBER_ROUTE, cmd: NumberAction.FIND_ALL })
  findAll(params: FindAllDto): Promise<Pagination<Number>> {
    return this.numberService.findAll(params);
  }

  @MessagePattern({ module: NUMBER_ROUTE, cmd: NumberAction.SELL_NUMBER })
  sellNumber(params: SellNumberDto): Promise<NumberUser> {
    return this.dataSource.transaction((manager) => {
      return this.numberService.withTransaction(manager).sellNumber(params);
    });
  }

  @MessagePattern({ module: NUMBER_ROUTE, cmd: NumberAction.SAVE })
  save(params: UpdateNumberDto): Promise<Number> {
    return this.numberService.save(params);
  }
}
