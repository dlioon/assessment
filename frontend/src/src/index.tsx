import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';
import { ModalProvider } from 'react-modal-hook';
import { Provider } from 'react-redux';

import './index.css';
import reportWebVitals from './reportWebVitals';
import { apiClient } from './app/components/query';
import { AuthProvider } from './app/components/auth/providers';
import { CartProvider } from './app/components/cart/providers';
import { QueryProvider } from './app/components/query/components/QueryProvider';

import { App } from './app';
import store from './store/configureStore';

import './locales/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <QueryProvider>
      <HelmetProvider>
        <ApolloProvider client={apiClient}>
          <CartProvider>
            <ModalProvider>
              <AuthProvider>
                <React.StrictMode>
                  <App />
                </React.StrictMode>
              </AuthProvider>
            </ModalProvider>
          </CartProvider>
        </ApolloProvider>
      </HelmetProvider>
    </QueryProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
