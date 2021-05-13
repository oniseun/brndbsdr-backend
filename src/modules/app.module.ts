import { HttpModule, Module } from '@nestjs/common';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';
import { CurrencyConverterService } from '../services/currency.service';
import { RedisCacheModule } from './redis-cache.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrencyController } from '../controllers/currency.controller';
import { LocationService } from '../services/location.service';
import { AppController } from '../controllers/app.controller';
import { LocationController } from '../controllers/location.controller';
import { AppService } from '../services/app.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    ignoreEnvFile: ['staging', 'production'].includes(process.env.NODE_ENV),
  }),ThrottlerModule.forRoot({
    ttl: 60,
    limit: 10,
  }), RedisCacheModule, HttpModule],
  controllers: [AppController,  ProductController, CurrencyController, LocationController],
  providers: [  ConfigService, AppService, ProductService, CurrencyConverterService, LocationService]
})
export class AppModule {}