import { registerAs } from '@nestjs/config';

import { SEARCH_CONFIG } from '../constants/elasticsearch.constants';

export const elasticsearchConfig = registerAs(SEARCH_CONFIG, () => ({
  node: process.env.ELASTICSEARCH_NODE,
  username: process.env.ELASTICSEARCH_USERNAME,
  password: process.env.ELASTICSEARCH_PASSWORD,
}));
