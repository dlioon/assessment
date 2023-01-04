import { useCallback, useContext } from 'react';

import { useCreateUser } from './api';
import { AuthContext } from '../context';
import { SignUpResponse } from '../interfaces';

export const useAuth = () => {
  const { user, signIn, signOut, isReady } = useContext(AuthContext);

  const [createUser, { data: createUserData, error }] = useCreateUser();

  const signUp = useCallback(
    async (email: string, password: string): Promise<SignUpResponse> => {
      await createUser({
        variables: {
          email,
          password,
        },
      });
      const { register: user } = createUserData || {};

      return {
        user,
        error: error?.message,
      };
    },
    [createUser, createUserData],
  );

  return {
    signIn,
    signUp,
    signOut,
    user,
    isAuthorized: isReady && !!user,
    isReady,
  };
};
