import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule as NestElasticsearchModule } from '@nestjs/elasticsearch';

import { elasticsearchConfig } from './config/elasticsearch.config';
import { SEARCH_CONFIG } from './constants/elasticsearch.constants';
import { ElasticsearchService } from './services/elasticsearch.service';

@Module({
  imports: [
    ConfigModule.forFeature(elasticsearchConfig),
    NestElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get(SEARCH_CONFIG);

        return {
          node: config.node,
          auth: {
            username: config.username,
            password: config.password,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [ElasticsearchService],
  exports: [ElasticsearchService],
})
export class ElasticsearchModule {}
