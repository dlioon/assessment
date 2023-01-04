import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { PaymentStatus } from '../constants/payment.constants';

@Schema()
export class Payment {
  @Prop({ type: String })
  _id: string;

  @Prop()
  amount: number;

  @Prop()
  status: PaymentStatus;

  @Prop()
  paymentId: string;
}

export type PaymentDocument = HydratedDocument<Payment>;
export const PaymentSchema = SchemaFactory.createForClass(Payment);
