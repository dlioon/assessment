import { Inject, Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

import { CreatePaymentIntentDto } from '../../payment/dtos/create-payment-intent.dto';
import { StripeWebhookDto } from '../../payment/dtos/stripe-webhook.dto';
import { Payment } from '../../payment/entities/payment.entity';
import {
  PaymentStatus,
  StripeWebhookStatus,
} from '../../payment/constants/payment.constants';
import { PaymentService } from '../../payment/services/payment.service';

import { STRIPE, STRIPE_CONFIG } from '../constants/stripe.constants';
import { StripeException } from '../exceptions/stripe.exception';

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  constructor(
    @Inject(STRIPE) private readonly client: Stripe,
    private readonly configService: ConfigService,
    private readonly paymentService: PaymentService,
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
      this.logger.error(error);
      throw new StripeException(error);
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
      this.logger.error(error);
      throw new StripeException(error);
    }
  }

  async processStripeWebhook(data: StripeWebhookDto): Promise<Payment | null> {
    const event: Stripe.Event = await this.constructEvent(data);
    let payment: Payment = null;

    try {
      const paymentIntent: Partial<Payment & { id: string }> =
        event.data.object;
      let status;

      switch (event.type) {
        case StripeWebhookStatus.SUCCEEDED:
          status = PaymentStatus.SUCCEEDED;

          break;
        case StripeWebhookStatus.FAILURE:
          status = PaymentStatus.FAILURE;

          break;
        default:
          this.logger.log(`Unhandled event type ${event.type}`);
      }
      payment = await this.paymentService.createPayment({
        amount: paymentIntent.amount,
        status,
        paymentId: paymentIntent.id,
      });
    } catch (e: any) {
      const message = `Error - ${e.message}. Event - ${JSON.stringify(event)}`;
      this.logger.error(message);
    }

    return payment;
  }
}
