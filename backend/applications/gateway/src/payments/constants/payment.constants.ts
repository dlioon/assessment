export const PAYMENT_SERVICE_NAME = 'PAYMENT_SERVICE';

export enum PaymentRoute {
  PAYMENT = 'payment',
}

export enum PaymentAction {
  CREATE_PAYMENT_INTENT = 'createPaymentIntent',
  CREATE_PAYMENT = 'createPayment',
  GET_PAYMENT = 'getPayment',
  PROCESS_STRIPE_WEBHOOK = 'processStripeWebhook',
}

export enum PaymentStatus {
  SUCCEEDED = 'succeeded',
}

export enum PaymentTypeEnum {
  PHONE_NUMBER = 'phoneNumber',
}
