import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@ObjectType()
export class PaymentItem {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  type: string;
}
