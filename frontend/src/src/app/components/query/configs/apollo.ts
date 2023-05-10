import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { AUTH_KEY } from 'app/components/auth/constants';
import { API_URL } from '../constants';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_URL || API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_KEY);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apiClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
