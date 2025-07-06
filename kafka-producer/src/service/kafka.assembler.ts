import { Injectable } from '@nestjs/common';
import {
  Transaction as TransactionPB,
  TransactionSchema,
} from '../infrastructure/publisher/stub/transaction_pb';
import { Transaction } from '../entity/transaction';
import { create } from '@bufbuild/protobuf';
import { toProtobufTimestamp } from 'src/infrastructure/publisher/util';

export interface IKafkaAssembler {
  assembleToKafka(transaction: Transaction): TransactionPB;
}

@Injectable()
export class KafkaAssembler implements IKafkaAssembler {
  assembleToKafka(transaction: Transaction): TransactionPB {
    return create(TransactionSchema, {
      id: transaction.id,
      amount: transaction.amount,
      createdAt: toProtobufTimestamp(transaction.timestamp),
      updatedAt: toProtobufTimestamp(transaction.timestamp),
    });
  }
}

export const IKafkaAssembler = Symbol('IKafkaAssembler');
