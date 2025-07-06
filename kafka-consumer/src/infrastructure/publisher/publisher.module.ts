import { Module } from '@nestjs/common';
import { IPublisher, KafkaPublisher } from './kafka-consumer';

@Module({
  providers: [
    {
      provide: IPublisher,
      useClass: KafkaPublisher,
    },
  ],
  exports: [
    {
      provide: IPublisher,
      useClass: KafkaPublisher,
    },
  ],
})
export class PublisherModule {}
