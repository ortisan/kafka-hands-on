// @generated by protoc-gen-es v2.6.0 with parameter "target=ts"
// @generated from file schemas/transaction.proto (package com.ortisan.transactions, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file schemas/transaction.proto.
 */
export const file_schemas_transaction: GenFile = /*@__PURE__*/
  fileDesc("ChlzY2hlbWFzL3RyYW5zYWN0aW9uLnByb3RvEhhjb20ub3J0aXNhbi50cmFuc2FjdGlvbnMiqQEKC1RyYW5zYWN0aW9uEgoKAmlkGAEgASgJEg4KBnVzZXJJZBgCIAEoCRIOCgZhbW91bnQYAyABKAESEAoIY3VycmVuY3kYBSABKAkSLQoJY3JlYXRlZEF0GAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBItCgl1cGRhdGVkQXQYByABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wYgZwcm90bzM", [file_google_protobuf_timestamp]);

/**
 * @generated from message com.ortisan.transactions.Transaction
 */
export type Transaction = Message<"com.ortisan.transactions.Transaction"> & {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string userId = 2;
   */
  userId: string;

  /**
   * @generated from field: double amount = 3;
   */
  amount: number;

  /**
   * @generated from field: string currency = 5;
   */
  currency: string;

  /**
   * @generated from field: google.protobuf.Timestamp createdAt = 6;
   */
  createdAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp updatedAt = 7;
   */
  updatedAt?: Timestamp;
};

/**
 * Describes the message com.ortisan.transactions.Transaction.
 * Use `create(TransactionSchema)` to create a new message.
 */
export const TransactionSchema: GenMessage<Transaction> = /*@__PURE__*/
  messageDesc(file_schemas_transaction, 0);

