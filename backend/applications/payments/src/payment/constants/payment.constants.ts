export const PAYMENT_ROUTE = 'payment';

export enum PaymentAction {
  CREATE_PAYMENT_INTENT = 'createPaymentIntent',
  CREATE_PAYMENT = 'createPayment',
  PROCESS_STRIPE_WEBHOOK = 'processStripeWebhook',
  GET_PAYMENT = 'getPayment',
}

export enum StripeWebhookStatus {
  SUCCEEDED = 'payment_intent.succeeded',
  FAILURE = 'payment_intent.payment_failed',
}

export enum ProductType {
  PHONE_NUMBER = 'phoneNumber',
}

export enum PaymentStatus {
  INIT = 'init',
  SUCCEEDED = 'succeeded',
}
