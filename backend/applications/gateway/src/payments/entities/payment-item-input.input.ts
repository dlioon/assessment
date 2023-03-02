import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class PaymentItemInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  type: string;
}
