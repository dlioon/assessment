import { Inject, Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

import { CreatePaymentIntentDto } from '../../payment/dtos/create-payment-intent.dto';
import { Payment } from '../../payment/entities/payment.entity';
import { PaymentService } from '../../payment/services/payment.service';

import { EventTypeMapping, STRIPE } from '../constants/stripe.constants';
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

  async processStripeWebhook(event: Stripe.Event): Promise<Payment | null> {
    let payment: Payment = null;

    try {
      const paymentIntent: Partial<Payment & { id: string }> =
        event.data.object;

      const handler = this[EventTypeMapping[event.type]];
      const status = handler ? handler() : null;

      if (!status) {
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
