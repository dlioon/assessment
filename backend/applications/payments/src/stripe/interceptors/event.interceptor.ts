import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import Stripe from 'stripe';

import { STRIPE, STRIPE_CONFIG } from '../constants/stripe.constants';

interface Request {
  body: Buffer;
  stripeSignature: string;
}

@Injectable()
export class EventInterceptor
  implements NestInterceptor<Request, Stripe.Event>
{
  constructor(
    @Inject(STRIPE) private readonly client: Stripe,
    private readonly configService: ConfigService,
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Stripe.Event> {
    const request = context.switchToHttp().getRequest();
    const { body, stripeSignature } = request.body;

    request.body.event = this.client.webhooks.constructEvent(
      Buffer.from(body),
      stripeSignature,
      this.configService.get(STRIPE_CONFIG).webhookSecretKey,
    );

    return next.handle();
  }
}
