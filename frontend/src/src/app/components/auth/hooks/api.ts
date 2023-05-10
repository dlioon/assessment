import { User } from '@firebase/auth';
import {
  gql,
  MutationTuple,
  QueryResult,
  useMutation,
  useQuery,
} from '@apollo/client';
import { QueryHookOptions } from '@apollo/client/react/types/types';

import { SignInParams } from '../interfaces';

const GET_ME = gql`
  query {
    getMe {
      uid
      email
    }
  }
`;

const CREATE_USER = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      uid
      email
    }
  }
`;

export const useGetMe = (options?: QueryHookOptions): QueryResult<User> =>
  useQuery(GET_ME, options);

export const useCreateUser = (): MutationTuple<
  { register: User },
  SignInParams
> => useMutation(CREATE_USER);
