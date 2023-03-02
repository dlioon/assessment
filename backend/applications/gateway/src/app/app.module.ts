import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { UserModule } from '../users/user.module';
import { AuthModule } from '../auth/auth.module';
import { NumberModule } from '../numbers/number.module';
import { PaymentModule } from '../payments/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './schema.gql',
      debug: true,
      playground: true,
    }),
    AuthModule,
    NumberModule,
    UserModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
