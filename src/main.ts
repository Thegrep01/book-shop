import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, INestExpressApplication } from '@nestjs/common';
import { join } from 'path';

const PORT: number = 8090;

async function bootstrap() {
  const app: INestApplication & INestExpressApplication = await NestFactory.create(AppModule);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'files'));

  await app.listen(PORT);
}
bootstrap();
