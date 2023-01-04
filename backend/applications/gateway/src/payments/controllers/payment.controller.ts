import {
  Controller,
  Post,
  HttpCode,
  Headers,
  Body,
  Req,
  RawBodyRequest,
} from '@nestjs/common';

import { PaymentService } from '../services/payment.service';

@Controller('payments')
export class PaymentController {
  constructor(public readonly paymentService: PaymentService) {}

  @Post('/webhook/stripe')
  @HttpCode(200)
  async webhook(
    @Headers('stripe-signature') stripeSignature: string,
    @Req() req: RawBodyRequest<Request>,
    @Body() body,
  ) {
    await this.paymentService.processStripeWebhook(
      {
        stripeSignature,
        body: req.rawBody,
      },
      body.data.object,
    );

    return { received: true };
  }
}
