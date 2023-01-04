import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PaymentItem } from './payment-item.entity';

@ObjectType()
export class Payment {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  paymentId: string;

  @Field(() => [PaymentItem])
  items: PaymentItem[];
}
