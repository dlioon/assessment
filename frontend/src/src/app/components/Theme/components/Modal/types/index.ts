import React from 'react';

export interface ModalProps {
  readonly open: boolean;
  readonly onSubmit: (...rest: any) => void;
  readonly onClose: (event: React.MouseEvent<HTMLElement>) => void;
}
