import { Module } from '@nestjs/common';

import { FirebaseModule } from '../firebase/firebase.module';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [FirebaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
