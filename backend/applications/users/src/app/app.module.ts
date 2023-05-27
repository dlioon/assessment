import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FirebaseModule } from '../firebase/firebase.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './applications/users/.env',
    }),
    AuthModule,
    FirebaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
