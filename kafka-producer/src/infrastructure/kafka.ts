import { Kafka, logLevel } from 'kafkajs';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';

export const kafkaConfig = {
  clientId: process.env.KAFKA_CLIENT_ID || 'kafka-producer',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  logLevel: logLevel.INFO,
};

export const schemaRegistryConfig = {
  host: process.env.SCHEMA_REGISTRY || 'http://localhost:8081',
};

export const kafka = new Kafka(kafkaConfig);

export const kafkaSchemaRegistry = new SchemaRegistry(schemaRegistryConfig);

export const kafkaProducer = kafka.producer();

export async function connectKafkaProducer() {
  await kafkaProducer.connect();
}
