import React from 'react';

import { Button, Typography, DialogActions } from '@mui/material';

import Modal from './Modal';
import ModalTitle from './ModalTitle';
import ModalContent from './ModalContent';
import { ModalProps } from '../types';
import { styles } from '../styles';

interface Props extends ModalProps {
  readonly title: string;
  readonly description: string;
  readonly agreeLabel?: string;
  readonly cancelLabel?: string;
  readonly noDescription?: boolean;
  readonly maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

const Confirmation: React.FC<Props> = ({
  open,
  onSubmit,
  onClose,
  title,
  description,
  agreeLabel,
  cancelLabel,
  noDescription,
  maxWidth,
}) => {
  return (
    <Modal open={open} onBackdropClick={onClose} maxWidth={maxWidth}>
      <ModalTitle onClose={onClose}>{title}</ModalTitle>

      {!noDescription && (
        <ModalContent>
          <Typography>{description}</Typography>
        </ModalContent>
      )}

      <DialogActions sx={styles.modalButtonBlock}>
        <Button className="modal-button" onClick={onClose} color="primary">
          {cancelLabel}
        </Button>
        <Button
          className="modal-button"
          onClick={onSubmit}
          color="primary"
          variant="contained"
        >
          {agreeLabel}
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default Confirmation;
