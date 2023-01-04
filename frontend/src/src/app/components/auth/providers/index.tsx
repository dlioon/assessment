import { ReactNode, useState, useCallback } from 'react';
import {
  User,
  getAuth,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
} from '@firebase/auth';

import { Loader } from '../../Theme/components/Loader';
import { error } from '../../utils/snackbar';

import '../config/firebase';
import { AuthContext } from '../context';
import { AUTH_KEY } from '../constants';
import { SignInResponse } from '../interfaces';
import { useUserMeQuery } from '../hooks/api';

export interface Props {
  readonly children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>();
  const [isReady, setIsReady] = useState<boolean>(false);

  useUserMeQuery({
    onCompleted: ({ getMe: result }) => {
      setUser(result);
      setIsReady(true);
    },
    onError: () => {
      setIsReady(true);
    },
  });

  const signIn = useCallback(
    async (email: string, password: string): Promise<SignInResponse> => {
      setIsReady(false);
      try {
        const response = await signInWithEmailAndPassword(
          getAuth(),
          email,
          password,
        );

        const token = await response.user.getIdToken();
        setUser(response.user);
        localStorage.setItem(AUTH_KEY, token);
        setIsReady(true);

        return { token };
      } catch (e: any) {
        error(e.message);
        setIsReady(true);
        return { error: e.message };
      }
    },
    [signInWithEmailAndPassword, localStorage, getAuth],
  );

  const signOut = useCallback(async () => {
    setIsReady(false);
    try {
      await signOutFirebase(getAuth());
      setUser(undefined);
      localStorage.removeItem(AUTH_KEY);
      setIsReady(true);
    } catch (e: any) {
      error(e.message);
      setIsReady(true);
      console.error(e);
    }
  }, [signOutFirebase, localStorage, getAuth]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user: user ?? null,
        isReady,
      }}
    >
      <Loader isLoading={!isReady} />
      {children}
    </AuthContext.Provider>
  );
};
