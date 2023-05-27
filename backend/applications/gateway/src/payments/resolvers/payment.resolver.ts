import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Auth } from '../../auth/decorators/auth.decorator';
import { AuthUser } from '../../auth/decorators/auth-user.decorator';

import { PaymentService } from '../services/payment.service';
import { PaymentIntent } from '../entities/payment-intent.graphql.entity';
import { Payment } from '../entities/payment.graphql.entity';
import { PaymentItem } from '../entities/payment-item.graphql.entity';
import { PaymentItemInput } from '../entities/payment-item-input.input';
import { PaymentAction, PaymentRoute } from '../constants/payment.constants';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Auth()
  @Mutation(() => PaymentIntent)
  createPaymentIntent(
    @Args('amount', { type: () => Int }) amount: number,
    @Args('currency', { type: () => String }) currency: string,
  ) {
    return this.paymentService.send(
      {
        module: PaymentRoute.PAYMENT,
        cmd: PaymentAction.CREATE_PAYMENT_INTENT,
      },
      {
        amount,
        currency,
      },
    );
  }

  @Auth()
  @Mutation(() => Payment)
  async createPayment(
    @Args('paymentId', { type: () => String }) paymentId: string,
    @Args('amount', { type: () => Int }) amount: number,
    @Args('items', { type: () => [PaymentItemInput] }) items: PaymentItem[],
    @AuthUser() user,
  ) {
    return this.paymentService.send(
      { module: PaymentRoute.PAYMENT, cmd: PaymentAction.CREATE_PAYMENT },
      {
        paymentId,
        amount,
        items,
        userId: user.uid,
      },
    );
  }

  @Auth()
  @Query(() => Payment)
  getPayment(@Args('id', { type: () => String }) id: string) {
    return this.paymentService.send(
      { module: PaymentRoute.PAYMENT, cmd: PaymentAction.GET_PAYMENT },
      { id },
    );
  }
}
