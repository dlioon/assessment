import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

import { RpcExceptionFilter } from '@app/common-errors';

import { AppModule } from './app/app.module';
import { PORT } from './app/constants/app.constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: process.env.PORT ?? PORT,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RpcExceptionFilter());

  await app.listen();
}
bootstrap();
