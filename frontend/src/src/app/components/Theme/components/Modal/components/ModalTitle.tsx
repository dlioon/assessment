import React, { memo } from 'react';

import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { SxProps, Theme, IconButton } from '@mui/material';

import { styles } from '../styles';

interface Props extends DialogTitleProps {
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
  content?: boolean;
  childStyles?: any;
  additionalStyles?: SxProps<Theme>;
}

const ModalTitle = ({
  onClose,
  children,
  childStyles = {},
  additionalStyles,
  ...dialogTitleProps
}: Props) => {
  return (
    <DialogTitle
      sx={{ ...styles.modalTitleBlock, ...additionalStyles } as SxProps<Theme>}
      {...dialogTitleProps}
    >
      {children}
      {onClose && (
        <IconButton sx={styles.modalCloseButton} onClick={onClose}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      )}
    </DialogTitle>
  );
};

export default memo(ModalTitle);
