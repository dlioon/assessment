import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PaymentAction } from './components/auth/constants';
import { LoginPage } from './pages/LoginPage';
import { PhoneNumbersPage } from './pages/PhoneNumbersPage';
import { CarsPage } from './pages/CarsPage';

export function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path={PaymentAction.MAIN} element={<PhoneNumbersPage />} />
          <Route path={PaymentAction.NUMBERS} element={<PhoneNumbersPage />} />
          <Route path={PaymentAction.CARS} element={<CarsPage />} />
          <Route path={PaymentAction.LOGIN} element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
