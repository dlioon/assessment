import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import Stripe from 'stripe';

import { StripeService } from '../../stripe/services/stripe.service';

import { Payment, PaymentDocument } from '../entities/payment.entity';
import { CreatePaymentIntentDto } from '../dtos/create-payment-intent.dto';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { StripeWebhookDto } from '../dtos/stripe-webhook.dto';
import {
  PaymentStatus,
  StripeWebhookStatus,
} from '../constants/payment.constants';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private readonly stripeService: StripeService,
  ) {}

  createPaymentIntent(
    data: CreatePaymentIntentDto,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return this.stripeService.createPaymentIntent(data);
  }

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    await this.paymentModel
      .findOneAndUpdate(
        { paymentId: createPaymentDto.paymentId },
        {
          ...createPaymentDto,
          status: createPaymentDto.status ?? PaymentStatus.INIT,
        },
        { upsert: true },
      )
      .exec();

    return this.paymentModel
      .findOne({ paymentId: createPaymentDto.paymentId })
      .exec();
  }

  getPayment(id: string): Promise<Payment> {
    return this.paymentModel.findOne({ paymentId: id }).exec();
  }

  async processStripeWebhook(data: StripeWebhookDto): Promise<Payment | null> {
    const event: Stripe.Event = await this.stripeService.constructEvent(data);
    let payment: Payment = null;

    try {
      switch (event.type) {
        case StripeWebhookStatus.SUCCEEDED:
          const paymentIntent: Partial<Payment & { id: string }> =
            event.data.object;
          payment = await this.createPayment({
            amount: paymentIntent.amount,
            status: paymentIntent.status,
            paymentId: paymentIntent.id,
          });
          break;
        case StripeWebhookStatus.FAILURE:
          // TODO: handle error
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (e: any) {
      const message = `Error - ${e.message}. Event - ${JSON.stringify(event)}`;
      console.error(message);
    }

    return payment;
  }
}
