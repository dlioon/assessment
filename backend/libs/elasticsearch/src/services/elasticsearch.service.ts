import { Injectable } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';
import {
  IndexRequest,
  IndexResponse,
  IndicesCreateRequest,
  IndicesCreateResponse,
  IndicesDeleteRequest,
  IndicesDeleteResponse,
  SearchRequest,
  SearchResponse,
} from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class ElasticsearchService {
  constructor(private readonly elasticService: NestElasticsearchService) {}

  index<T>(params: IndexRequest<T>): Promise<IndexResponse> {
    return this.elasticService.index<T>(params);
  }

  createIndex(params: IndicesCreateRequest): Promise<IndicesCreateResponse> {
    return this.elasticService.indices.create(params);
  }

  deleteIndex(params: IndicesDeleteRequest): Promise<IndicesDeleteResponse> {
    return this.elasticService.indices.delete(params);
  }

  search<T>(params: SearchRequest): Promise<SearchResponse<T>> {
    return this.elasticService.search<T>(params);
  }
}
