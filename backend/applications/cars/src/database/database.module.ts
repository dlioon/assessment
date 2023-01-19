import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ConnectionOptions, Connection } from 'typeorm';

import { DATABASE_CONFIG } from './constants/database.constants';
import { databaseConfig } from './config/database.config';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get(DATABASE_CONFIG),
    }),
  ],
})
export class DatabaseModule {
  static forFeature(
    entities?: EntityClassOrSchema[],
    connection?: Connection | ConnectionOptions | string,
  ) {
    return TypeOrmModule.forFeature(entities, connection);
  }
}
