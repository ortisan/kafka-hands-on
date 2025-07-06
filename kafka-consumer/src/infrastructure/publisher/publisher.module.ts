import { Module } from '@nestjs/common';
import { KafkaConsumer } from './kafka-consumer';

@Module({
  providers: [KafkaConsumer],
  exports: [KafkaConsumer],
})
export class PublisherModule {}
