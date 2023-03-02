import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PaymentAction } from '../../constants';
import { useAuth } from '../../hooks/useAuth';

export interface Props {
  readonly children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { isAuthorized, isReady } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized && isReady) {
      navigate(PaymentAction.LOGIN);
    }
  }, [isAuthorized, isReady]);

  return isAuthorized ? children : null;
};
