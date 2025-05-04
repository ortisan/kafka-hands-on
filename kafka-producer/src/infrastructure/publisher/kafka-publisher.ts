import { Payment } from 'src/entity/payment';
import { Payment as PaymengKafka } from 'src/infrastructure/publisher/proto/payment';
import {
  kafkaProducer,
  connectKafkaProducer,
  kafkaSchemaRegistry,
} from '../kafka';
import { RecordMetadata } from 'kafkajs';
import { Injectable } from '@nestjs/common';

const topic = 'transactions';
const subject = 'transactions-value';

@Injectable()
export class KafkaPublisher {
  async publish(payment: Payment): Promise<RecordMetadata[]> {
    const protoMessage: PaymengKafka = {
      id: payment.id,
      userId: payment.userId,
      amount: payment.amount,
      currency: payment.currency,
      timestamp: payment.timestamp,
    };
    const id = await kafkaSchemaRegistry.getLatestSchemaId(subject);
    const encodedMessage = await kafkaSchemaRegistry.encode(id, protoMessage);

    await connectKafkaProducer();
    return await kafkaProducer.send({
      topic,
      messages: [{ value: encodedMessage }],
    });
  }
}
