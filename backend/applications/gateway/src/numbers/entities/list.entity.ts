import { ObjectType, Field } from '@nestjs/graphql';

import { Meta } from '../../common/entities/meta.entity';

import { Number } from './number.entity';

@ObjectType()
export class NumberList {
  @Field(() => [Number])
  items: Number[];

  @Field(() => Meta)
  meta: Meta;
}
