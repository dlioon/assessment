import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import Stripe from 'stripe';

import { PaymentService } from '../services/payment.service';
import { PAYMENT_ROUTE, PaymentAction } from '../constants/payment.constants';
import { CreatePaymentIntentDto } from '../dtos/create-payment-intent.dto';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { GetPaymentDto } from '../dtos/get-payment.dto';
import { StripeWebhookDto } from '../dtos/stripe-webhook.dto';
import { Payment } from '../entities/payment.entity';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern({
    module: PAYMENT_ROUTE,
    cmd: PaymentAction.CREATE_PAYMENT_INTENT,
  })
  createPaymentIntent(
    data: CreatePaymentIntentDto,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return this.paymentService.createPaymentIntent(data);
  }

  @MessagePattern({ module: PAYMENT_ROUTE, cmd: PaymentAction.CREATE_PAYMENT })
  createPayment(data: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.createPayment(data);
  }

  @MessagePattern({
    module: PAYMENT_ROUTE,
    cmd: PaymentAction.PROCESS_STRIPE_WEBHOOK,
  })
  processStripeWebhook(data: StripeWebhookDto): Promise<Payment | null> {
    return this.paymentService.processStripeWebhook(data);
  }

  @MessagePattern({ module: PAYMENT_ROUTE, cmd: PaymentAction.GET_PAYMENT })
  getPayment({ id }: GetPaymentDto): Promise<Payment> {
    return this.paymentService.getPayment(id);
  }
}
