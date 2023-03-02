import { createContext } from 'react';
import { User } from '@firebase/auth';

import { SignInResponse } from '../interfaces';

export interface AuthContextProps {
  readonly signIn: (email: string, password: string) => Promise<SignInResponse>;
  readonly signOut: () => Promise<void>;
  readonly user: User | null;
  readonly isReady: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  signIn: async () => ({}),
  signOut: async () => {},
  user: null,
  isReady: false,
});
