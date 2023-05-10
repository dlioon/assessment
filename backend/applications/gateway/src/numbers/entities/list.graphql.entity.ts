import { ObjectType, Field } from '@nestjs/graphql';

import { Number } from './number.graphql.entity';
import { Meta } from './meta.graphql.entity';

@ObjectType()
export class List {
  @Field(() => [Number])
  items: Number[];

  @Field(() => Meta)
  meta: Meta;
}
