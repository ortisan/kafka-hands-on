import { Module } from '@nestjs/common';
import { ITransactionService, TransactionService } from './transaction.service';
import { PublisherModule } from 'src/infrastructure/publisher/publisher.module';
import { IKafkaAssembler, KafkaAssembler } from './kafka.assembler';

@Module({
  imports: [PublisherModule],
  providers: [
    {
      provide: ITransactionService,
      useClass: TransactionService,
    },
    {
      provide: IKafkaAssembler,
      useClass: KafkaAssembler,
    },
  ],
  exports: [
    {
      provide: ITransactionService,
      useClass: TransactionService,
    },
    {
      provide: IKafkaAssembler,
      useClass: KafkaAssembler,
    },
  ],
})
export class ServiceModule {}
