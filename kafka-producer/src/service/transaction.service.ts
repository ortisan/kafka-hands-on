import { Inject, Injectable, Logger } from '@nestjs/common';
import { IPublisher } from '../infrastructure/publisher/kafka-publisher';
import { Transaction } from '../entity/transaction';
import { IKafkaAssembler } from './kafka.assembler';
import { AsyncResult, Result } from 'src/infrastructure/fp/result';

export interface ITransactionService {
  createTransaction(transaction: Transaction): AsyncResult<boolean, Error>;
}

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @Inject(IKafkaAssembler) private readonly kafkaAssembler: IKafkaAssembler,
    @Inject(IPublisher) private readonly publisher: IPublisher,
  ) {}

  private readonly logger = new Logger(TransactionService.name);

  async createTransaction(
    transaction: Transaction,
  ): Promise<Result<boolean, Error>> {
    const transactionPb = this.kafkaAssembler.assembleToKafka(transaction);
    const result = await this.publisher.publish(transactionPb, 'transactions');
    this.logger.log('Transaction published:', result);
    return result;
  }
}

export const ITransactionService = Symbol('ITransactionService');
