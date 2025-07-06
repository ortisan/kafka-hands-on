import { Injectable } from '@nestjs/common';
import { KafkaJS } from '@confluentinc/kafka-javascript';

import { Message } from '@bufbuild/protobuf';
import { AsyncResult } from '../fp/result';
import { Err, Ok } from '@thames/monads';
import {
  SchemaRegistryClient,
  ProtobufSerializer,
  SerdeType,
} from '@confluentinc/schemaregistry';
import { TransactionSchema } from './stub/transaction_pb';
import { ConfigService } from '@nestjs/config';

export interface IPublisher {
  publish(message: Message, topic: string): AsyncResult<boolean, Error>;
}

@Injectable()
export class KafkaPublisher implements IPublisher {
  private kafka: KafkaJS.Kafka;
  private registry: SchemaRegistryClient;
  private serializer: ProtobufSerializer;

  constructor(private readonly configService: ConfigService) {
    this.kafka = new KafkaJS.Kafka({
      kafkaJS: { brokers: [this.configService.get<string>('kafka.broker')!] },
    });
    this.registry = new SchemaRegistryClient({
      baseURLs: [
        `http://${this.configService.get<string>('kafka.schema-registry')!}`,
      ],
    });

    this.serializer = new ProtobufSerializer(this.registry, SerdeType.VALUE, {
      autoRegisterSchemas: false,
    });
    this.serializer.registry.add(TransactionSchema);
  }
  async publish(message: Message, topic: string): AsyncResult<boolean, Error> {
    const producer = this.getKafkaProducer();
    await producer.connect();
    try {
      const serializedMessage = await this.serializer.serialize(topic, message);
      await producer.send({
        topic,
        messages: [{ value: serializedMessage }],
      });
      return Ok(true);
    } catch (error) {
      return Err(error);
    } finally {
      await producer.disconnect();
    }
  }

  getKafkaProducer(): KafkaJS.Producer {
    const producer = this.kafka.producer({
      kafkaJS: { allowAutoTopicCreation: false },
    });
    return producer;
  }
}

export const IPublisher = Symbol('IPublisher');
