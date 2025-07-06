# Hands-on Kafka Environment

This project is a hands-on learning environment for Apache Kafka. It is designed to help you understand and experiment with Kafka and its ecosystem. As part of this project, you will also create a demo application featuring a Kafka producer and consumer to illustrate real-world usage.

This environment provides a ready-to-use Apache Kafka setup with Schema Registry, ksqlDB, Kafka Connect, and a modern Kafka UI, all orchestrated via Docker Compose. It is ideal for development, testing, and learning purposes.

## Stack Overview

- **Kafka**: Distributed event streaming platform
- **Schema Registry**: Manages Avro/JSON/Protobuf schemas for Kafka topics
- **ksqlDB**: Streaming SQL engine for Apache Kafka
- **Kafka Connect**: Integration framework for connecting Kafka with external systems
- **Kafka UI**: Web UI for managing Kafka topics, schemas, and more

## Prerequisites

- [Docker](https://www.docker.com/get-started) (v20+ recommended)
- [Docker Compose](https://docs.docker.com/compose/) (v2+ recommended)

## Getting Started

1. **Clone this repository**

   ```sh
   git clone <your-repo-url>
   cd hands-on-kafka
   ```

2. **Start the environment**

   ```sh
   docker-compose up -d
   ```

   This will start all services in the background.

3. **Access the Kafka UI**

   - Open your browser and go to: [http://localhost:8080](http://localhost:8080)
   - You can view topics, consumers, schemas, and more.

4. **Access the Schema Registry API**

   - Schema Registry REST endpoint: [http://localhost:8081](http://localhost:8081)
   - Example: List all subjects
     ```sh
     curl http://localhost:8081/subjects
     ```

5. **Access ksqlDB**

   - ksqlDB server endpoint: [http://localhost:8088](http://localhost:8088)
   - You can use the ksqlDB CLI container for interactive queries:
     ```sh
     docker-compose exec ksqldb-cli ksql http://ksqldb-server:8088
     ```

6. **Access Kafka Connect**

   - Kafka Connect REST endpoint: [http://localhost:8083](http://localhost:8083)

## Stopping the Environment

To stop all services:

```sh
docker-compose down
```

## Registering Your First Schema

1. Create a file named `user.avsc`:

   ```json
   {
     "type": "record",
     "name": "User",
     "namespace": "com.example",
     "fields": [
       {"name": "id", "type": "int"},
       {"name": "name", "type": "string"},
       {"name": "email", "type": "string"}
     ]
   }
   ```

2. Register the schema with Schema Registry:

   ```sh
   curl -X POST http://localhost:8081/subjects/users-value/versions \
     -H "Content-Type: application/vnd.schemaregistry.v1+json" \
     -d '{
       "schema": "{\"type\":\"record\",\"name\":\"User\",\"namespace\":\"com.example\",\"fields\":[{\"name\":\"id\",\"type\":\"int\"},{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"email\",\"type\":\"string\"}]}"
     }'
   ```

## Notes

- All services are networked together using Docker's user-defined bridge network (`kafka-net`).
- Default ports are exposed for local development. Change them in `docker-compose.yml` if needed.
- For advanced configuration, refer to the official documentation of each component.

---

Enjoy your hands-on Kafka environment!


## Hands-On

### Create Topic

```sh
docker-compose exec kafka kafka-topics --create --topic transactions --bootstrap-server kafka:9092 --partitions 1 --replication-factor 1
```

## Define Schema


#### Avro
```avsc
{
  "type": "record",
  "name": "Payment",
  "namespace": "com.ortisan.kafka-hands-on",
  "fields": [
    {"name": "id", "type": "string"},
    {"name": "userId", "type": "string"},
    {"name": "amount", "type": "double"},
    {"name": "currency", "type": "string"},
    {"name": "timestamp", "type": "long"}
  ]
}
```

```sh
curl -X POST http://localhost:8081/subjects/transactions-value/versions \
  -H "Content-Type: application/vnd.schemaregistry.v1+json" \
  -d "$(jq -n --arg schema "$(cat schemas/payment.avsc)" '{schema: $schema}')"
```

#### ProtoBuff

Schema

```proto
syntax = "proto3";

package com.ortisan.kafkahandson;

message Payment {
  string id = 1;
  string userId = 2;
  double amount = 3;
  string currency = 4;
  int64 timestamp = 5;
  google.protobuf.Timestamp timestamp = 5;
}
```

Register on Schema Registry

```sh
curl -X POST http://localhost:8081/subjects/transaction-value/versions \
  -H "Content-Type: application/vnd.schemaregistry.v1+json" \
  -d @- <<EOF
{
  "schemaType": "PROTOBUF",
  "schema": $(jq -Rs . < schemas/transaction.proto)
}
EOF
```



## Generate Proto Files


--proto_path=$(npm explore ts-proto -- pwd)/proto \


Inside projects, execute:
```sh
npx protoc \
--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts_proto \
--ts_proto_out=./src/infrastructure/publisher/stub \
--ts_opt=esModuleInterop=true,useOptionals=all,env=node,useDate=string,outputEncodeMethods=true,outputJsonMethods=true \
--proto_path=../schemas \
--proto_path=$(npm explore ts-proto -- pwd)/build/protos \
../schemas/payment.proto
```


PATH=$PATH:$(pwd)/kafka-producer/node_modules/.bin \
  protoc -I . \
  --es_out schemas/gen/ \
  --es_opt target=ts \
  schemas/transaction.proto