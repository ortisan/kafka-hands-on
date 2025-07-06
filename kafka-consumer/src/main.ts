import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { KafkaConsumer } from './infrastructure/publisher/kafka-consumer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      colors: true,
      prefix: 'kafka-consumer',
      json: true,
    }),
  });

  const consumer = app.get<KafkaConsumer>(KafkaConsumer);
  await consumer.consumerStart();
}

bootstrap();
