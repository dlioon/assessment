export interface PaymentIntent {
  id: string;
  client_secret: string;
  status: string;
}

export interface Payment {
  _id: string;
  status: string;
  paymentId: string;
  userId: string;
  items: any;
}

export interface CreatePaymentIntent {
  amount: number;
  currency: string;
}

export interface CreatePayment {
  paymentId: string;
  amount: number;
  items: any;
}
