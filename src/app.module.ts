import { HttpModule, Module } from '@nestjs/common';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CurrencyModule } from './currency/currency.module';
import { LocationModule } from './location/location.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: ['staging', 'production'].includes(process.env.NODE_ENV),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    RedisCacheModule,
    HttpModule,
    CurrencyModule,
    LocationModule,
    ProductModule,
  ],
})
export class AppModule {}
