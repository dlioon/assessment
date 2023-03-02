import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { USER_CONFIG, USER_SERVICE_NAME } from './constants/user.constants';
import { userConfig } from './config/user.config';

@Module({
  imports: [
    ConfigModule.forFeature(userConfig),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: USER_SERVICE_NAME,
        useFactory: async (configService: ConfigService) =>
          configService.get(USER_CONFIG),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
