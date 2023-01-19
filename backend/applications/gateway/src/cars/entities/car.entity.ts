import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Car {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  make: string;

  @Field(() => String)
  model: string;

  @Field(() => Int)
  price: number;
}
