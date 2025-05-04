import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from '../../service/transaction.service';
import {
  TransactionInputDto,
  transactionSchema,
} from './dto/transaction.input.dto';
import { Payment } from '../../entity/payment';
import { v4 as uuidv4 } from 'uuid';
import { ZodPipe } from '../../infrastructure/validation/zod.pipeline';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async pay(
    @Body(new ZodPipe(transactionSchema)) transactionInput: TransactionInputDto,
  ): Promise<Payment> {
    const payment: Payment = {
      id: uuidv4(),
      userId: transactionInput.userId,
      amount: transactionInput.amount,
      currency: transactionInput.currency,
      timestamp: new Date(),
    };
    await this.transactionService.createTransaction(payment);
    return payment;
  }
}
