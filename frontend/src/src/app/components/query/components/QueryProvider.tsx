import { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';

import { getInitialQueryClient } from '../utils';

const client = getInitialQueryClient();

export interface QueryProviderProps {
  readonly children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);
