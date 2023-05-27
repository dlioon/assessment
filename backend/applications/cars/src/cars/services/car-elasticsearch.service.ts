import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ElasticsearchService } from '@app/elasticsearch';
import {
  IndicesCreateResponseType,
  IndicesDeleteResponseType,
} from '@app/elasticsearch/types/elasticsearch.type';

import { Car } from '../entities/car.entity';
import { FindAllDto } from '../dtos/find-all.dto';
import {
  CARS_ELASTICSEARCH_CONFIG,
  CHUNK_SIZE,
} from '../constants/car.constants';
import { ChunkErrorType } from '../types/chunk-error.type';

@Injectable()
export class CarElasticsearchService {
  private index = 'cars';

  constructor(
    private readonly elasticSearchService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {}

  async indexCars(cars: Car[]): Promise<ChunkErrorType[]> {
    const errors: ChunkErrorType[] = [];
    for (let i = 0; i < cars.length; i += CHUNK_SIZE) {
      const chunk = cars.slice(i, i + CHUNK_SIZE);
      try {
        await this.elasticSearchService.bulk({
          operations: chunk.flatMap((doc) => [
            { index: { _index: this.index } },
            doc,
          ]),
        });
      } catch (e: any) {
        errors.push({
          from: i,
          to: i + CHUNK_SIZE,
          error: e.message,
        });
      }
    }

    return errors;
  }

  createIndex(): Promise<IndicesCreateResponseType> {
    return this.elasticSearchService.createIndex({
      index: this.index,
      ...this.configService.get(CARS_ELASTICSEARCH_CONFIG),
    });
  }

  deleteIndex(): Promise<IndicesDeleteResponseType> {
    return this.elasticSearchService.deleteIndex({
      index: this.index,
    });
  }

  async search({
    text,
    page = 1,
    limit = 10,
  }: FindAllDto): Promise<{ total: number; rows: Car[] }> {
    const result = await this.elasticSearchService.search<Car>({
      index: this.index,
      from: limit * page,
      size: limit,
      query: {
        multi_match: {
          query: text,
          fields: ['make', 'model'],
          fuzziness: 'auto',
        },
      },
    });

    const hits = result.hits.hits;

    return {
      total:
        typeof result.hits.total === 'number'
          ? result.hits.total
          : result.hits.total.value,
      rows: hits.map((item) => item._source),
    };
  }
}
