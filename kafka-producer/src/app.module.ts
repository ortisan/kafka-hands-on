import { Module } from '@nestjs/common';
import { TransactionController } from './ports/input/transaction.controller';
import { TransactionService } from './service/transaction.service';
import { KafkaPublisher } from './infrastructure/publisher/kafka-publisher';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [TransactionService, KafkaPublisher],
})
export class AppModule {}
