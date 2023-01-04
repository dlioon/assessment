import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Formik } from 'formik';
import { useCallback, useContext, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { CheckCircleOutline, HighlightOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { Loader } from 'app/components/Theme/components/Loader';
import { CartContext } from 'app/components/cart/context';

import { useCreatePayment, usePayment } from '../hooks/api';
import { StripeStatus } from '../constants';

export interface Props {
  clientSecret: string;
  price: number;
  items: any;
  paymentIntentId: string | null;
  updateSecret: () => Promise<void>;
}

export const PaymentForm = ({
  clientSecret,
  updateSecret,
  price,
  items,
  paymentIntentId,
}: Props) => {
  const { t } = useTranslation();
  const { clearCart } = useContext(CartContext);

  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFailure, setIsFailure] = useState<boolean>(false);

  const [getPayment] = usePayment();
  const [createPayment] = useCreatePayment();

  const handleReturn = useCallback(async () => {
    await updateSecret();
    setIsFailure(false);
  }, []);

  const onSubmit = useCallback(async () => {
    if (!stripe || !elements || !clientSecret || !paymentIntentId) {
      return;
    }
    setIsLoading(true);

    try {
      await createPayment({
        variables: {
          paymentId: paymentIntentId,
          amount: price,
          items,
        },
      });
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }

    try {
      const { paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000',
        },
        redirect: 'if_required',
      });
      if (paymentIntent) {
        const interval = setInterval(async () => {
          const response = await getPayment({
            variables: {
              id: paymentIntent.id,
            },
          });
          const status = response.data.getPayment.status;

          if (
            status === StripeStatus.SUCCESS ||
            status === StripeStatus.FAILURE
          ) {
            clearInterval(interval);
            setIsLoading(false);
          }
          if (status === StripeStatus.SUCCESS) {
            clearCart();
            setIsSuccess(true);
          }
          if (status === StripeStatus.FAILURE) {
            setIsFailure(true);
          }
        }, 1000);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }, [stripe, elements, clientSecret, getPayment, clearCart]);

  return (
    <>
      <Loader isLoading={isLoading} />
      {isSuccess && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <CheckCircleOutline sx={{ fontSize: 40, color: '#4caf50' }} />
          </Grid>
          <Grid item>{t('payment.messages.success')}</Grid>
        </Grid>
      )}
      {isFailure && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <HighlightOff sx={{ fontSize: 40, color: '#e91e63' }} />
          </Grid>
          <Grid item>{t('payment.messages.failure')}</Grid>
          <Grid item>
            <Button color="primary" variant="contained" onClick={handleReturn}>
              {t('payment.buttons.return')}
            </Button>
          </Grid>
        </Grid>
      )}
      {!isSuccess && !isFailure && (
        <Formik initialValues={{}} onSubmit={onSubmit}>
          {({ errors, handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit}>
              <PaymentElement />
              <Box
                sx={{
                  paddingTop: '10px',
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  {t('payment.buttons.pay')}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};
