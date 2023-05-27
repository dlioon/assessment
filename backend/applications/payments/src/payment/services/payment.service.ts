import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Payment, PaymentDocument } from '../entities/payment.entity';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { PaymentStatus } from '../constants/payment.constants';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

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
