export const AUTH_ROUTE = 'auth';

export enum UserAction {
  VALIDATE = 'validate',
  REGISTER = 'register',
}

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
