import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

import { PhoneNumbersTable } from 'app/components/phones/components/PhoneNumbersTable';
import { ProtectedRoute } from 'app/components/auth/components/routes/ProtectedRoute';

export const PhoneNumbersPage = () => {
  const { t } = useTranslation();

  return (
    <ProtectedRoute>
      <>
        <Helmet>
          <title>{t('phoneNumbers.title')}</title>
        </Helmet>
        <PhoneNumbersTable />
      </>
    </ProtectedRoute>
  );
};
