import { Module } from '@nestjs/common';
import { IPublisher, KafkaPublisher } from './kafka-publisher';

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
