import { HttpModule, Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { LocationResolver } from './location.resolver';

@Module({
  imports: [RedisCacheModule, HttpModule],
  controllers: [LocationController],
  providers: [LocationService, LocationResolver],
})
export class LocationModule {}
