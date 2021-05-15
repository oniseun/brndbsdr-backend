import { HttpModule, Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';

@Module({
  imports: [RedisCacheModule, HttpModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
