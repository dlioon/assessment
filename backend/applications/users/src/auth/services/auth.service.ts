import { Injectable } from '@nestjs/common';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

import { FirebaseService } from '../../firebase/services/firebase.service';

import { RegisterDto } from '../dtos/register.dto';
import { ValidateTokenDto } from '../dtos/validate-token.dto';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  register(params: RegisterDto): Promise<UserRecord> {
    return this.firebaseService.register(params);
  }

  async validate(params: ValidateTokenDto): Promise<UserRecord> {
    const token = await this.firebaseService.verifyIdToken(params);

    return this.firebaseService.getUser(token.uid);
  }
}
