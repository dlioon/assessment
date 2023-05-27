import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NumberModule } from '../numbers/number.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './applications/numbers/.env',
    }),
    DatabaseModule,
    NumberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
