import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TransactionFor } from 'nest-transact';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { ElasticsearchService } from '@app/elasticsearch';
import {
  IndexResponseType,
  IndicesCreateResponseType,
  IndicesDeleteResponseType,
} from '@app/elasticsearch/types/elasticsearch.type';

import { Car } from '../entities/car.entity';
import { FindAllDto } from '../dtos/find-all.dto';

@Injectable()
export class CarService extends TransactionFor<CarService> {
  private index = 'cars';

  constructor(
    @InjectRepository(Car) private readonly repo,
    private readonly elasticSearchService: ElasticsearchService,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef);
  }

  findAll({ limit = 10, page = 1 }): Promise<Pagination<Car>> {
    return paginate<Car>(this.repo, {
      limit,
      page,
    });
  }

  indexCar({ model, make, price, id }: Car): Promise<IndexResponseType> {
    return this.elasticSearchService.index<Car>({
      index: this.index,
      document: {
        id,
        model,
        make,
        price,
      },
    });
  }

  createIndex(): Promise<IndicesCreateResponseType> {
    return this.elasticSearchService.createIndex({
      index: this.index,
      settings: {
        index: {
          number_of_replicas: 0,
        },
        analysis: {
          analyzer: {
            custom: {
              type: 'custom',
              tokenizer: 'standard',
              filter: ['lowercase', 'stemmer'],
            },
          },
        },
      },
      mappings: {
        properties: {
          id: { type: 'integer' },
          make: { type: 'text' },
          model: { type: 'text' },
          price: { type: 'integer' },
        },
      },
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
      // @ts-ignore
      total: result.hits.total.value,
      rows: hits.map((item) => item._source),
    };
  }

  save(params: Car): Promise<Car> {
    return this.repo.save(params);
  }

  findMany(params: any) {
    return this.repo.find(params);
  }
}
