import { useCallback, useEffect, useMemo, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Box } from '@mui/material';

import { Loader } from 'app/components/Theme/components/Loader';
import { error } from 'app/components/utils/snackbar';

import { PaymentForm } from './PaymentForm';
import { useCreatePaymentIntent } from '../hooks/api';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY ?? '');

export interface Props {
  price: number;
  items: any;
  onClose: () => void;
}

export const Payment = ({ price, items, onClose }: Props) => {
  const [clientSecret, setClientSecret] = useState<string>();
  const [createPaymentIntent, { data: createPaymentIntentData }] =
    useCreatePaymentIntent();

  const updateSecret = useCallback(async () => {
    try {
      const { data } = await createPaymentIntent({
        variables: {
          amount: price,
          currency: 'usd',
        },
      });

      setClientSecret(data?.createPaymentIntent?.client_secret);
    } catch (e: any) {
      console.error(e);
      error(e.message);
      onClose();
    }
  }, [createPaymentIntent, price]);

  useEffect(() => {
    updateSecret();
  }, [price]);

  const stripeOptions = useMemo(() => ({ clientSecret }), [clientSecret]);

  return (
    <Box
      sx={{
        padding: '10px',
        minHeight: '100px',
      }}
    >
      {clientSecret ? (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <PaymentForm
            clientSecret={clientSecret}
            updateSecret={updateSecret}
            price={price}
            items={items}
            paymentIntentId={
              createPaymentIntentData?.createPaymentIntent?.id ?? null
            }
          />
        </Elements>
      ) : (
        <Loader isLoading={true} />
      )}
    </Box>
  );
};
