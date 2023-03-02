import React, { forwardRef } from 'react';
import { Slide, SlideProps } from '@mui/material';

interface Props extends SlideProps {}

const Transition = ({ ref, ...props }: Props) => {
  return <Slide direction="down" ref={ref} {...props} />;
};

export default forwardRef(Transition);
