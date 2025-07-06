import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      colors: true,
      prefix: 'kafka-producer',
      json: true,
    }),
  });

  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>('http.port')!);
}
bootstrap();
