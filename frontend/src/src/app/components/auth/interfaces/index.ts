import { User } from '@firebase/auth';

export interface SignInResponse {
  token?: string;
  error?: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface SignUpResponse {
  user?: User;
  error?: string;
}
