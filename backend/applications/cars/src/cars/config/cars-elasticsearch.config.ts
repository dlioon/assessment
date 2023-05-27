import { registerAs } from '@nestjs/config';

import { CARS_ELASTICSEARCH_CONFIG } from '../constants/car.constants';

export const carsElasticsearchConfig = registerAs(
  CARS_ELASTICSEARCH_CONFIG,
  () => ({
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
  }),
);
