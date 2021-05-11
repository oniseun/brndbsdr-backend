import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

    async get(key): Promise<any> {
        return await this.cache.get(key);
    }

    async set(key, value): Promise<any> {
        await this.cache.set(key, value, 1000);
    }

    async reset(): Promise<any> {
        await this.cache.reset();
    }

    async del(key): Promise<any> {
        await this.cache.del(key);
    }
}