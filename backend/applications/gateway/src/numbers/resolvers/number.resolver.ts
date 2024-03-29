import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';

import { Auth } from '../../auth/decorators/auth.decorator';

import { NumberService } from '../services/number.service';
import { List } from '../entities/list.graphql.entity';
import { Number } from '../entities/number.graphql.entity';
import { NumberAction } from '../constants/number.constants';

@Resolver(() => List)
export class NumberResolver {
  constructor(private readonly numberService: NumberService) {}

  @Auth()
  @Query(() => List)
  findAll(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('page', { type: () => Int }) page: number,
  ) {
    return this.numberService.send(
      { cmd: NumberAction.FIND_ALL },
      { limit, page },
    );
  }

  @Auth()
  @Mutation(() => Number)
  changeStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status', { type: () => String }) status: string,
  ) {
    return this.numberService.send({ cmd: NumberAction.SAVE }, { id, status });
  }
}
