import React, { memo } from 'react';

import Dialog, { DialogProps } from '@mui/material/Dialog';

import Transition from './Transition';

interface Props extends DialogProps {
  additionalStyles?: any;
}

const Modal = ({
  maxWidth = 'sm',
  scroll = 'body',
  fullWidth = true,
  fullScreen = false,
  additionalStyles = {},
  ...props
}: Props) => {
  return (
    <Dialog
      classes={{ paper: { ...additionalStyles } }}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      scroll={scroll}
      fullWidth={fullWidth}
      TransitionComponent={Transition}
      {...props}
    />
  );
};

export default memo(Modal);
