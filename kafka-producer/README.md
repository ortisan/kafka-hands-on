# Kafka Producer

This is a NestJS application that serves as a Kafka producer for a transaction processing system. It provides a REST API for submitting transactions, which are then published to a Kafka topic using Avro schema serialization.

## Overview

The Kafka Producer:
- Receives transaction requests via a REST API
- Validates the input data
- Creates payment records with unique IDs and timestamps
- Serializes the payments using Avro schemas
- Publishes the serialized messages to a Kafka topic named 'transactions'

## Prerequisites

Before running the Kafka Producer, you need to have the following:

1. Node.js (v16 or higher) and npm installed
2. Docker and Docker Compose installed
3. The Kafka infrastructure running (using the provided docker-compose.yml)

### Starting the Kafka Infrastructure

The project includes a docker-compose.yml file that sets up the complete Kafka environment. Run the following command from the root directory of the project:

```bash
docker-compose up -d
```

This will start:
- Zookeeper (port 2181)
- Kafka broker (ports 9092 and 29092 for localhost)
- Schema Registry (port 8081)
- ksqlDB server and CLI
- Kafka Connect
- Kafka UI (accessible at http://localhost:8080)

Make sure all services are up and running before starting the Kafka Producer.

## Installation

To install the Kafka Producer, navigate to the kafka-producer directory and run:

```bash
cd kafka-producer
npm install
```

## Configuration

The Kafka Producer uses the following default configuration:

- Kafka broker: localhost:9092 (can be overridden with KAFKA_BROKER env var)
- Schema Registry: http://localhost:8081 (can be overridden with SCHEMA_REGISTRY env var)
- Client ID: kafka-producer (can be overridden with KAFKA_CLIENT_ID env var)
- Application port: 3000 (can be overridden with PORT env var)

## Running the Application

To start the Kafka Producer in development mode:

```bash
npm run start:dev
```

For production:

```bash
npm run build
npm run start:prod
```

The application will be available at http://localhost:3000 (or the port specified in the PORT environment variable).

## Usage

### Sending a Transaction

To send a transaction, make a POST request to the `/transactions` endpoint:

```bash
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "amount": 100.50,
    "currency": "USD"
  }'
```

### Response

The API will respond with the created payment object, including the generated ID and timestamp:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "user123",
  "amount": 100.50,
  "currency": "USD",
  "timestamp": "2023-05-03T22:00:00.000Z"
}
```

## Avro Schema

The messages are serialized using the following Avro schema (located in the root directory as `payment.avsc`):

```json
{
  "type": "record",
  "name": "Payment",
  "namespace": "com.example",
  "fields": [
    { "name": "paymentId", "type": "string" },
    { "name": "userId", "type": "string" },
    { "name": "amount", "type": "double" },
    { "name": "currency", "type": "string" },
    { "name": "timestamp", "type": "long" }
  ]
}
```

## Monitoring

You can monitor the Kafka topics and messages using the Kafka UI at http://localhost:8080.
