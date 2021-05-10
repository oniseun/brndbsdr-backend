import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from './redis-cache.service';
const LOG_PREFIX : string = 'LocationService:'

@Injectable()
export class LocationService {
  constructor(private httpService: HttpService, private env: ConfigService, private cacheManager: RedisCacheService) {}
  async getLocationByIp(ip: string): Promise<object> {
    const CACHE_KEY = `IP_${ip}`
    const url: string = `${this.env.get('LOCATION_CHECKER_URL')}/${ip}/json`
    const headers: object = { 'Content-Type': 'application/json' }
    const cachedData = await this.cacheManager.get(CACHE_KEY);
    if (cachedData) {
      Logger.log( `FETCHING LOCATION DATA FROM CACHE ${CACHE_KEY} -> ${JSON.stringify(cachedData)}`, LOG_PREFIX);
      return cachedData;
    }

    try {
      const response = await this.httpService.get(url, { headers }).toPromise();

      Logger.log(
        `GET URL: ${url} - 
        httpstatus: ${response.status}(${response.statusText.toUpperCase()}) - 
        RESPONSE: ${JSON.stringify(response.data)}`,
        LOG_PREFIX
      );
      
      Logger.log( `CACHING LOCATION DATA -> ${CACHE_KEY}`, LOG_PREFIX);

      await this.cacheManager.set(CACHE_KEY , response.data); // add to cache

      return response.data;
    } catch (error) {
      Logger.log(
        `GET URL: ${url} - ERROR: ${error.code} ${error.message} ${JSON.stringify(error.response)}`,
        LOG_PREFIX,
      );
      throw error;
    }
  }

}

