import {
  gql,
  MutationTuple,
  QueryResult,
  useMutation,
  useQuery,
} from '@apollo/client';
import { QueryHookOptions } from '@apollo/client/react/types/types';

import { ChangeNumberStatus, Number } from '../interfaces';

const FIND_ALL_NUMBERS = gql`
  query FindAll($limit: Int! = 10, $page: Int! = 1) {
    findAll(limit: $limit, page: $page) {
      items {
        id
        number
        price
      }
      meta {
        totalItems
        itemCount
      }
    }
  }
`;

export const useNumbersList = (options?: QueryHookOptions): QueryResult<any> =>
  useQuery(FIND_ALL_NUMBERS, options);

const CHANGE_STATUS = gql`
  mutation ChangeStatus($id: Int!, $status: String!) {
    changeStatus(id: $id, status: $status) {
      id
    }
  }
`;

export const useChangeStatus = (): MutationTuple<
  { changeNumberStatus: Number },
  ChangeNumberStatus
> => useMutation(CHANGE_STATUS);
