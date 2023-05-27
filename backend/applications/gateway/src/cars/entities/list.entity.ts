import { ObjectType, Field } from '@nestjs/graphql';

import { Car } from './car.entity';
import { Meta } from './meta.graphql.entity';

@ObjectType()
export class CarList {
  @Field(() => [Car])
  items: Car[];

  @Field(() => Meta)
  meta: Meta;
}
