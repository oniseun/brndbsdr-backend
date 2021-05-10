import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
const LOG_PREFIX : string = 'CurrencyConverterService:'

@Injectable()
export class CurrencyConverterService {
  constructor(private httpService: HttpService, private env: ConfigService, private cacheManager: RedisCacheService) {}
  async getRates(): Promise<object> {
    
    const url: string = this.env.get('CURRENCY_CONVERTER_URL')
    const access_key : string = this.env.get('CURRENCY_CONVERTER_ACCESS_KEY')
    const base: string = this.env.get('CURRENCY_CONVERTER_BASE')
    const headers: object = { 'Content-Type': 'application/json' }
    const CACHE_KEY = `RATES_${base}`

    const cachedData = await this.cacheManager.get(CACHE_KEY);
    if (cachedData) {
      Logger.log( `FETCHING CURRENCY RATES FROM CACHE ${CACHE_KEY} -> ${JSON.stringify(cachedData)}`, LOG_PREFIX);
      return cachedData;
    }

    try {
      const response = await this.httpService.get(url, { headers, params: { access_key, base } }).toPromise();

      Logger.log(
        `GET URL: ${url} - 
        httpstatus: ${response.status}(${response.statusText.toUpperCase()}) - 
        RESPONSE: ${JSON.stringify(response.data)}`,
        LOG_PREFIX
      );
      Logger.log( `CACHING CURRENCY RATES -> ${CACHE_KEY}`, LOG_PREFIX);
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

