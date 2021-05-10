

import { HttpModule, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CurrencyConverterService } from './currency.service';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrencyController } from './currency.controller';
import { LocationService } from './location.service';
import { AppController } from './app.controller';
import { LocationController } from './location.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    ignoreEnvFile: ['staging', 'production'].includes(process.env.NODE_ENV),
  }), RedisCacheModule, HttpModule],
  controllers: [AppController,  ProductController, CurrencyController, LocationController],
  providers: [  ConfigService, AppService, ProductService, CurrencyConverterService, LocationService]
})
export class AppModule {}