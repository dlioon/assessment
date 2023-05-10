import { Inject, Injectable } from '@nestjs/common';
import * as Firebase from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

import { RegisterDto } from '../../auth/dtos/register.dto';
import { ValidateTokenDto } from '../../auth/dtos/validate-token.dto';

import { FIREBASE } from '../constants/firebase.constants';
import { FirebaseException } from '../exceptions/firebase.exception';

@Injectable()
export class FirebaseService {
  constructor(@Inject(FIREBASE) private readonly client: Firebase.app.App) {}

  async register({ email, password }: RegisterDto): Promise<UserRecord> {
    try {
      return await this.client.auth().createUser({
        email,
        password,
      });
    } catch (error: any) {
      throw new FirebaseException(error);
    }
  }

  async verifyIdToken({ token }: ValidateTokenDto): Promise<DecodedIdToken> {
    try {
      return await this.client.auth().verifyIdToken(token);
    } catch (error: any) {
      throw new FirebaseException(error);
    }
  }

  async getUser(uid: string): Promise<UserRecord> {
    try {
      return await this.client.auth().getUser(uid);
    } catch (error: any) {
      throw new FirebaseException(error);
    }
  }
}
