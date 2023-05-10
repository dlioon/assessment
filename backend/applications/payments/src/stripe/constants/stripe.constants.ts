import { StripeWebhookStatus } from '../../payment/constants/payment.constants';

export const STRIPE_CONFIG = 'stripe';

export const STRIPE = 'stripe';

export const EventTypeMapping = {
  [StripeWebhookStatus.SUCCEEDED]: 'processSucceed',
  [StripeWebhookStatus.FAILURE]: 'processFailure',
};
