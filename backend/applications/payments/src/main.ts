import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';
import { RpcExceptionFilter } from './utils/exception-filters/rpc.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: process.env.PORT,
    },
  });
  app.useGlobalFilters(new RpcExceptionFilter());

  await app.listen();
}
bootstrap();
