import { Module } from '@nestjs/common';

import { UserModule } from '../users/user.module';

import { BearerStrategy } from './strategies/bearer.strategy';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [BearerStrategy],
})
export class AuthModule {}
