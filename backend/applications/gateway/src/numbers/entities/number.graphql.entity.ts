import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Number {
  @Field(() => Int)
  id: number;

  @Field(() => Float)
  number: number;

  @Field(() => Int)
  price: number;

  @Field(() => String)
  status: string;
}
