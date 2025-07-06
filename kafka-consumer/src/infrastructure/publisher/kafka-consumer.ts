import { KafkaJS } from '@confluentinc/kafka-javascript';
import {
  ProtobufDeserializer,
  SchemaRegistryClient,
  SerdeType,
} from '@confluentinc/schemaregistry';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transaction, TransactionSchema } from './stub/transaction_pb';

@Injectable()
export class KafkaConsumer {
  private kafka: KafkaJS.Kafka;
  private registry: SchemaRegistryClient;
  private deserializer: ProtobufDeserializer;

  constructor(private readonly configService: ConfigService) {
    this.kafka = new KafkaJS.Kafka({
      kafkaJS: { brokers: [this.configService.get<string>('kafka.broker')!] },
    });
    this.registry = new SchemaRegistryClient({
      baseURLs: [
        `http://${this.configService.get<string>('kafka.schema-registry')!}`,
      ],
    });

    this.deserializer = new ProtobufDeserializer(
      this.registry,
      SerdeType.VALUE,
      {},
    );
  }

  async consumerStart(): Promise<void> {
    // Initialization
    const consumer = this.kafka.consumer({
      kafkaJS: {
        groupId: 'group-test',
        fromBeginning: true,
      },
    });

    await consumer.connect();

    try {
      await consumer.subscribe({ topics: ['transactions'] });
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const buffer = message.value;

          if (!buffer || !Buffer.isBuffer(buffer)) {
            throw new Error('Message is not a valid buffer');
          }

          const deserializedMessage: Transaction =
            (await this.deserializer.deserialize(
              topic,
              message.value as Buffer,
            )) as Transaction;

          console.log({
            topic,
            partition,
            headers: message.headers,
            offset: message.offset,
            key: message.key?.toString(),
            value: deserializedMessage,
          });
        },
      });

      await new Promise(() => {});
    } finally {
      await consumer.disconnect();
    }
  }
}
