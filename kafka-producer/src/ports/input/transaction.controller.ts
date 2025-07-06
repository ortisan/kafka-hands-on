import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ITransactionService,
  TransactionService,
} from '../../service/transaction.service';
import {
  TransactionInputDto,
  transactionSchema,
} from './dto/transaction.input.dto';
import { Transaction } from '../../entity/transaction';
import { v4 as uuidv4 } from 'uuid';
import { ZodPipe } from '../../infrastructure/validation/zod.pipeline';

@Controller('transactions')
export class TransactionController {
  constructor(
    @Inject(ITransactionService)
    private readonly transactionService: ITransactionService,
  ) {}

  @Post()
  async pay(
    @Body(new ZodPipe(transactionSchema)) transactionInput: TransactionInputDto,
  ): Promise<Transaction> {
    const payment: Transaction = {
      id: uuidv4(),
      userId: transactionInput.userId,
      amount: transactionInput.amount,
      currency: transactionInput.currency,
      timestamp: new Date(),
    };
    const result = await this.transactionService.createTransaction(payment);
    if (result.isOk()) {
      return payment;
    }
    throw result.unwrapErr();
  }
}
