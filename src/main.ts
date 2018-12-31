import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, INestExpressApplication } from '@nestjs/common';

const PORT: number = 8090;

async function bootstrap() {
  const app: INestApplication & INestExpressApplication = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
