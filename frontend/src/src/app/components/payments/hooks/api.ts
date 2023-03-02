import { gql, MutationTuple, useLazyQuery, useMutation } from '@apollo/client';
import { QueryHookOptions } from '@apollo/client/react/types/types';

import {
  CreatePayment,
  CreatePaymentIntent,
  Payment,
  PaymentIntent,
} from '../interfaces';

const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($amount: Int!, $currency: String!) {
    createPaymentIntent(amount: $amount, currency: $currency) {
      id
      client_secret
      status
    }
  }
`;

export const useCreatePaymentIntent = (): MutationTuple<
  { createPaymentIntent: PaymentIntent },
  CreatePaymentIntent
> => useMutation(CREATE_PAYMENT_INTENT);

const CREATE_PAYMENT = gql`
  mutation CreatePayment(
    $paymentId: String!
    $amount: Int!
    $items: [PaymentItemInput!]!
  ) {
    createPayment(paymentId: $paymentId, amount: $amount, items: $items) {
      _id
    }
  }
`;

export const useCreatePayment = (): MutationTuple<
  { createPayment: Payment },
  CreatePayment
> => useMutation(CREATE_PAYMENT);

const GET_PAYMENT = gql`
  query GetPayment($id: String!) {
    getPayment(id: $id) {
      status
    }
  }
`;

export const usePayment = (options?: QueryHookOptions) =>
  useLazyQuery(GET_PAYMENT, options);
