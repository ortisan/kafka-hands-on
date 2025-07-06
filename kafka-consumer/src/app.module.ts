import { Module } from '@nestjs/common';
import { PublisherModule } from './infrastructure/publisher/publisher.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './infrastructure/configuration/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    PublisherModule,
  ],
  providers: [PublisherModule],
})
export class AppModule {}
