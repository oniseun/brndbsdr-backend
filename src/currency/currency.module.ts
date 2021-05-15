import { Module } from '@nestjs/common';
import { CurrencyConverterService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { HttpModule } from '@nestjs/common';
import { CurrencyResolver } from './currency.resolver';

@Module({
  imports: [RedisCacheModule, HttpModule],
  controllers: [CurrencyController],
  providers: [CurrencyConverterService, CurrencyResolver],
})
export class CurrencyModule {}
