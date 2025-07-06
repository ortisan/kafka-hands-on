import { Module } from '@nestjs/common';
import { TransactionController } from './ports/input/transaction.controller';
import { PublisherModule } from './infrastructure/publisher/publisher.module';
import { ServiceModule } from './service/service.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './infrastructure/configuration/configuration';

@Module({
  controllers: [TransactionController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ServiceModule,
    PublisherModule,
  ],
  providers: [ServiceModule, PublisherModule],
})
export class AppModule {}
