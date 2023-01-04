import { QueryClient } from 'react-query';

import { queryClient } from '../configs/query';

export const getInitialQueryClient = () => new QueryClient(queryClient);
