import { create } from '@bufbuild/protobuf';
import { Timestamp, TimestampSchema } from '@bufbuild/protobuf/wkt';

export function toProtobufTimestamp(date: Date): Timestamp {
  const millis = date.getTime();
  return create(TimestampSchema, {
    seconds: BigInt(Math.floor(millis / 1_000)),
    nanos: (millis % 1_000) * 1_000_000,
  });
}
