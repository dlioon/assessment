import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import Stripe from 'stripe';

import { StripeService } from '../services/stripe.service';
import {
  PAYMENT_ROUTE,
  PaymentAction,
} from '../../payment/constants/payment.constants';
import { CreatePaymentIntentDto } from '../../payment/dtos/create-payment-intent.dto';
import { StripeWebhookDto } from '../../payment/dtos/stripe-webhook.dto';
import { Payment } from '../../payment/entities/payment.entity';

@Controller()
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @MessagePattern({
    module: PAYMENT_ROUTE,
    cmd: PaymentAction.CREATE_PAYMENT_INTENT,
  })
  createPaymentIntent(
    data: CreatePaymentIntentDto,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return this.stripeService.createPaymentIntent(data);
  }
  @MessagePattern({
    module: PAYMENT_ROUTE,
    cmd: PaymentAction.PROCESS_STRIPE_WEBHOOK,
  })
  processStripeWebhook(data: StripeWebhookDto): Promise<Payment | null> {
    return this.stripeService.processStripeWebhook(data);
  }
}
