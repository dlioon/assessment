import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LoginForm } from 'app/components/auth/components/LoginForm';
import { useAuth } from 'app/components/auth/hooks/useAuth';
import { PaymentAction } from 'app/components/auth/constants';

export const LoginPage = () => {
  const { isAuthorized } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate(PaymentAction.LOGIN);
    }
  }, [isAuthorized]);

  return (
    <>
      <Helmet>
        <title>{t('login.title')}</title>
      </Helmet>
      <LoginForm />
    </>
  );
};
