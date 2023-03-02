import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PaymentIntent {
  @Field(() => String)
  id: string;

  @Field(() => String)
  object: string;

  @Field(() => Int)
  amount: number;

  @Field(() => String)
  client_secret: string;

  @Field(() => String)
  status: string;
}
