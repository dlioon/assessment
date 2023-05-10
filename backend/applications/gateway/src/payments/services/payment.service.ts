import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CommandService } from '@app/command';

import {
  PAYMENT_SERVICE_NAME,
  PaymentAction,
  PaymentRoute,
  PaymentStatus,
  PaymentTypeEnum,
} from '../constants/payment.constants';
import { NumberService } from '../../numbers/services/number.service';

@Injectable()
export class PaymentService extends CommandService<
  PaymentRoute,
  PaymentAction
> {
  constructor(
    @Inject(PAYMENT_SERVICE_NAME) private readonly paymentService: ClientProxy,
    private readonly numberService: NumberService,
  ) {
    super(paymentService);
  }

  async processStripeWebhook(data, paymentObj) {
    const response = await this.send(
      {
        module: PaymentRoute.PAYMENT,
        cmd: PaymentAction.PROCESS_STRIPE_WEBHOOK,
      },
      data,
    );

    if (response && paymentObj.status === PaymentStatus.SUCCEEDED) {
      await this.numberService.sellNumber({
        userId: response.userId,
        numberIds: response.items.reduce((acc, { id, type }) => {
          if (type === PaymentTypeEnum.PHONE_NUMBER) {
            acc.push(id);
          }

          return acc;
        }, []),
        paymentId: paymentObj.id,
      });
    }

    return response;
  }
}
