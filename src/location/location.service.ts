import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import { Location } from './location.model';
const LOG_PREFIX = 'LocationService:';
import defaultLocation from '../../db/defaultLocation.json';
@Injectable()
export class LocationService {
  constructor(
    private httpService: HttpService,
    private env: ConfigService,
    private cacheManager: RedisCacheService,
  ) {}
  async getLocationByIp(ip: string): Promise<Location> {
    const CACHE_KEY = `IP_${ip}`;
    const url = `${this.env.get('LOCATION_CHECKER_URL')}/${ip}/json`;
    const headers: object = { 'Content-Type': 'application/json' };
    const cachedData = await this.cacheManager.get(CACHE_KEY);
    if (cachedData) {
      Logger.log(
        `FETCHING LOCATION DATA FROM CACHE ${CACHE_KEY} -> ${JSON.stringify(
          cachedData,
        )}`,
        LOG_PREFIX,
      );
      return cachedData;
    }

    try {
      const response = await this.httpService.get(url, { headers }).toPromise();

      Logger.log(
        `GET URL: ${url} - 
        httpstatus: ${response.status}(${response.statusText.toUpperCase()}) - 
        RESPONSE: ${JSON.stringify(response.data)}`,
        LOG_PREFIX,
      );
      if (response.data.error || response.data.reserved) {
        Logger.log(
          `RESERVED/LOCAL IP ADDRESS DETECTED -> Returning default location`,
          LOG_PREFIX,
        );
        return defaultLocation;
      }
      Logger.log(`CACHING LOCATION DATA -> ${CACHE_KEY}`, LOG_PREFIX);
      await this.cacheManager.set(CACHE_KEY, response.data); // add to cache

      return response.data;
    } catch (error) {
      Logger.log(
        `GET URL: ${url} - ERROR: ${error.code} ${
          error.message
        } ${JSON.stringify(error.response)}`,
        LOG_PREFIX,
      );
      return defaultLocation;
    }
  }
}
