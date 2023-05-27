import { ObjectType, Field } from '@nestjs/graphql';

import { Number } from './number.graphql.entity';
import { CarsMeta } from './cars-meta.graphql.entity';

@ObjectType()
export class List {
  @Field(() => [Number])
  items: Number[];

  @Field(() => CarsMeta)
  meta: CarsMeta;
}
