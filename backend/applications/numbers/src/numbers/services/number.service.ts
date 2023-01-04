import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleRef } from '@nestjs/core';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { TransactionFor } from 'nest-transact';
import { In } from 'typeorm';

import { Number } from '../entities/number.entity';
import { NumberUser } from '../entities/number-user.entity';
import { UpdateNumberDto } from '../dtos/update-number.dto';
import { SellNumberDto } from '../dtos/sell-number.dto';
import { FindAllDto } from '../dtos/find-all.dto';
import { NumberStatus } from '../constants/number.constants';

@Injectable()
export class NumberService extends TransactionFor<NumberService> {
  constructor(
    @InjectRepository(Number) private readonly repo,
    @InjectRepository(NumberUser) private readonly numberUserRepo,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef);
  }

  findAll({ limit, page }: FindAllDto): Promise<Pagination<Number>> {
    return paginate<Number>(
      this.repo,
      {
        limit,
        page,
      },
      { where: { status: NumberStatus.AVAILABLE } },
    );
  }

  async sellNumber(params: SellNumberDto): Promise<NumberUser> {
    const numbers: Number[] = await this.repo.find({
      where: {
        id: In(params.numberIds),
      },
    });

    numbers.forEach((number) => {
      number.status = NumberStatus.SOLD;
    });

    await this.repo.save(numbers);

    const userNumbers: Partial<NumberUser>[] = params.numberIds.reduce(
      (acc: Partial<NumberUser>[], numberId: number) => {
        acc.push({
          numberId,
          userId: params.userId,
          paymentId: params.paymentId,
        });

        return acc;
      },
      [],
    );

    return this.numberUserRepo.save(userNumbers);
  }

  save(params: UpdateNumberDto): Promise<Number> {
    return this.repo.save(params);
  }
}
