import { gql, QueryResult, useQuery } from '@apollo/client';
import { QueryHookOptions } from '@apollo/client/react/types/types';

const FIND_ALL_NUMBERS = gql`
  query FindAllCars($input: CarFindAll! = {}) {
    findAllCars(input: $input) {
      items {
        id
        make
        model
        price
      }
      meta {
        totalItems
        itemCount
      }
    }
  }
`;

export const useCarsList = (options?: QueryHookOptions): QueryResult<any> =>
  useQuery(FIND_ALL_NUMBERS, options);
