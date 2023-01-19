import { ObjectType, Field } from '@nestjs/graphql';

import { Meta } from '../../common/entities/meta.entity';

import { Car } from './car.entity';

@ObjectType()
export class CarList {
  @Field(() => [Car])
  items: Car[];

  @Field(() => Meta)
  meta: Meta;
}
