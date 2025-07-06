import { Module } from '@nestjs/common';
import { TransactionController } from './ports/input/transaction.controller';
import { PublisherModule } from './infrastructure/publisher/publisher.module';
import { ServiceModule } from './service/service.module';

@Module({
  controllers: [TransactionController],
  imports: [ServiceModule, PublisherModule],
  providers: [ServiceModule, PublisherModule],
})
export class AppModule {}
