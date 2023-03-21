import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Modal,
  ModalTitle,
} from 'app/components/Theme/components/Modal/components';

export interface Props {
  onSubmit: (data: boolean, cancellationReason?: number) => Promise<void>;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
  price: number;
  items: any;
}

export const BuyPhoneModal = ({ onClose, open, price, items }: Props) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose} maxWidth="xs">
      <ModalTitle onClose={onClose}>
        {t('phoneNumbers.buyModal.title')}
      </ModalTitle>
    </Modal>
  );
};
