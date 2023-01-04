import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Grid } from '@mui/material';

import {
  Modal,
  ModalTitle,
} from 'app/components/Theme/components/Modal/components';
import { Payment } from 'app/components/payments/components/Payment';

export interface Props {
  onSubmit: (data: boolean, cancellationReason?: number) => Promise<void>;
  onClose: () => void;
  open: boolean;
  cart: any;
}

export const CartModal = ({ onClose, open, cart }: Props) => {
  const { t } = useTranslation();

  const [isPayment, setIsPayment] = useState<boolean>(false);

  const totalPrice = useMemo(
    () => cart.reduce((acc: any, item: any) => (acc += item.price), 0),
    [cart],
  );

  const handleBuy = useCallback(() => {
    setIsPayment(true);
  }, []);

  return (
    <Modal open={open} onClose={onClose} maxWidth="xs">
      <ModalTitle onClose={onClose}>{t('cart.modal.title')}</ModalTitle>
      {isPayment ? (
        <Payment
          price={totalPrice}
          items={cart.map((item: any) => ({
            type: item.type,
            id: item.id,
          }))}
          onClose={onClose}
        />
      ) : (
        <Box sx={{ padding: '0 20px' }}>
          <Grid container>
            <Grid item xs={8}>
              {t('cart.modal.product')}
            </Grid>
            <Grid item xs={4}>
              {t('cart.modal.price')}
            </Grid>
          </Grid>
          {cart.map((item: any, key: number) => (
            <Grid container key={`cart${key}`}>
              <Grid item xs={8}>
                {item.name}
              </Grid>
              <Grid item xs={4}>
                {item.price}
              </Grid>
            </Grid>
          ))}
          <Grid container>
            <Grid item xs={8}>
              {t('cart.modal.total')}
            </Grid>
            <Grid item xs={4}>
              {totalPrice}
            </Grid>
          </Grid>
          <Button
            color="primary"
            variant="contained"
            onClick={handleBuy}
            fullWidth
          >
            {t('cart.modal.buttons.goToPayment')}
          </Button>
        </Box>
      )}
    </Modal>
  );
};
