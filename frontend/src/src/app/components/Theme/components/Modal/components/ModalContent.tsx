import React, { memo } from 'react';

import DialogContent, { DialogContentProps } from '@mui/material/DialogContent';

import { styles } from '../styles';

interface Props extends DialogContentProps {
  children: React.ReactNode;
  className?: string;
  additionalStyles?: any;
}

const ModalContent = ({
  children,
  className,
  additionalStyles = {},
  ...DialogContentProps
}: Props) => {
  return (
    <DialogContent
      sx={{ ...styles.content, ...additionalStyles }}
      {...DialogContentProps}
    >
      {children}
    </DialogContent>
  );
};

export default memo(ModalContent);
