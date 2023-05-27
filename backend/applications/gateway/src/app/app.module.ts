import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { UserModule } from '../users/user.module';
import { AuthModule } from '../auth/auth.module';
import { NumberModule } from '../numbers/number.module';
import { PaymentModule } from '../payments/payment.module';
import { CarModule } from '../cars/car.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './applications/gateway/.env',
    }),
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
    CarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
