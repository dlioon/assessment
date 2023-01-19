import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

import { ProtectedRoute } from 'app/components/auth/components/routes/ProtectedRoute';
import { CarsTable } from 'app/components/cars/components/CarsTable';

export const CarsPage = () => {
  const { t } = useTranslation();

  return (
    <ProtectedRoute>
      <>
        <Helmet>
          <title>{t('cars.title')}</title>
        </Helmet>
        <CarsTable />
      </>
    </ProtectedRoute>
  );
};
