import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new ConsoleLogger({
      colors: true,
      prefix: 'kafka-producer',
      json: true,
    }),
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
