import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

import { CreatePaymentIntentDto } from '../../payment/dtos/create-payment-intent.dto';
import { StripeWebhookDto } from '../../payment/dtos/stripe-webhook.dto';

import { STRIPE, STRIPE_CONFIG } from '../constants/stripe.constants';
import { StripeException } from '../exceptions/stripe.exception';

@Injectable()
export class StripeService {
  constructor(
    @Inject(STRIPE) private readonly client: Stripe,
    private readonly configService: ConfigService,
  ) {}

  async createPaymentIntent({
    amount,
  }: CreatePaymentIntentDto): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    try {
      return await this.client.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
      });
    } catch (error: any) {
      throw new StripeException({
        code: error.raw.code,
        message: error.raw.message,
      });
    }
  }

  async constructEvent({
    body,
    stripeSignature,
  }: StripeWebhookDto): Promise<Stripe.Event> {
    try {
      return this.client.webhooks.constructEvent(
        Buffer.from(body),
        stripeSignature,
        this.configService.get(STRIPE_CONFIG).webhookSecretKey,
      );
    } catch (error: any) {
      console.log(error);
      throw new StripeException(error);
    }
  }
}
