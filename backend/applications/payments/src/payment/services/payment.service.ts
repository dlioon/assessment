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
}
