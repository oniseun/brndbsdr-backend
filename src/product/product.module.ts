import { HttpModule, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [RedisCacheModule, HttpModule],
  controllers: [ProductController],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
