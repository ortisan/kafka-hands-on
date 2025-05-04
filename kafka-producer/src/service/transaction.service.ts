import { TransactionDto } from './transaction.dto';
import { Injectable, Logger } from '@nestjs/common';
import { KafkaPublisher } from '../infrastructure/publisher/kafka-publisher';
import { Payment } from '../entity/payment';

@Injectable()
export class TransactionService {

  constructor(
    private readonly kafkaPublisher: KafkaPublisher,
  ) {}

  private readonly logger = new Logger(TransactionService.name);

  async createTransaction(payment: Payment): Promise<void> {
    const result = await this.kafkaPublisher.publish(payment);
    this.logger.log('Transaction published:', result);
  }
}
