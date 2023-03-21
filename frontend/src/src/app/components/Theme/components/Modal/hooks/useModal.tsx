import React, { useCallback, useState } from 'react';
import { useModal as useModalHook } from 'react-modal-hook';

import { Loader } from '../../Loader';
import { ModalProps } from '../types';

export interface Props<T> {
  readonly onSubmit?: (params: T) => void;
  readonly onClose?: (event: React.MouseEvent<HTMLElement>) => void;
  readonly Modal: React.FC<ModalProps>;
  readonly props?: object;
  readonly unmount?: boolean;
  readonly isSupportShowProps?: boolean;
  readonly closeOnSubmit?: boolean;
}

export const useModal = <T,>({
  onSubmit = () => {},
  onClose = () => {},
  Modal,
  props = {},
  unmount = false,
  isSupportShowProps = true,
  closeOnSubmit = true,
}: Props<T>) => {
  const [showProps, setShowProps] = useState<Record<string, any>>({});

  const [showModal, hideModal] = useModalHook(() => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = useCallback(
      async (params: T) => {
        try {
          if (closeOnSubmit) setIsLoading(true);

          const submit = showProps.onSubmit || onSubmit;

          await submit(params, showProps);
          if (closeOnSubmit) {
            hideModal();
          }
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      },
      [showProps, closeOnSubmit, hideModal],
    );

    const handleClose = useCallback(() => {
      const close = showProps.onClose || onClose;
      close();
      hideModal();
    }, [hideModal, showProps, onClose, close]);

    return (
      <>
        <Loader isLoading={isLoading} />
        <Modal
          open={true}
          {...props}
          {...showProps}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      </>
    );
  }, [showProps, props, onSubmit, onClose]);

  const handleShow = useCallback(
    (props = {}) => {
      if (isSupportShowProps) {
        setShowProps(props);
      }
      showModal();
    },
    [isSupportShowProps, showModal],
  );

  return [handleShow, hideModal];
};
