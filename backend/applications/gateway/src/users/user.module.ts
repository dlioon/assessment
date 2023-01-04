import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { USER_SERVICE_NAME } from './constants/user.constants';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: USER_SERVICE_NAME,
        useFactory: async (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('MODULE_USERS_HOST'),
            port: config.get<number>('MODULE_USERS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
