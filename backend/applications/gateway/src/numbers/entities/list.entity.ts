import { ObjectType, Field } from '@nestjs/graphql';

import { Number } from './number.entity';
import { Meta } from './meta.entity';

@ObjectType()
export class List {
  @Field(() => [Number])
  items: Number[];

  @Field(() => Meta)
  meta: Meta;
}
