import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';

import { RequestPatternType } from '../../app/types/request-pattern.type';

import {
  PAYMENT_SERVICE_NAME,
  PaymentAction,
  PaymentRoute,
  PaymentStatus,
  PaymentTypeEnum,
} from '../constants/payment.constants';
import { NumberService } from '../../numbers/services/number.service';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PAYMENT_SERVICE_NAME) private readonly paymentService: ClientProxy,
    private readonly numberService: NumberService,
  ) {}

  async send(
    {
      module = PaymentRoute.PAYMENT,
      cmd,
    }: Partial<RequestPatternType<PaymentRoute, PaymentAction>>,
    data,
  ) {
    const { error, ...response } = await firstValueFrom(
      this.paymentService.send(
        {
          module,
          cmd,
        },
        data,
      ),
    );

    if (error) {
      throw new BadRequestException(error.message);
    }

    return response;
  }

  async processStripeWebhook(data, paymentObj) {
    const response = await this.send(
      { cmd: PaymentAction.PROCESS_STRIPE_WEBHOOK },
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
