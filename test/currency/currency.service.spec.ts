import { CurrencyConverterService } from '../../src/currency/currency.service';
import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from '../../src/redis-cache/redis-cache.service';
import { Cache } from 'cache-manager';
describe('CurrencyConverterService', () => {
  let service: CurrencyConverterService;
  let httpService: HttpService;
  let configService: ConfigService;
  let redis: RedisCacheService;
  beforeEach(() => {
    httpService = new HttpService();
    configService = new ConfigService();
    redis = new RedisCacheService(Cache);
    service = new CurrencyConverterService(httpService, configService, redis);
  });

  it('should get current rates by set base currency ', async () => {
    const currencyRates = {
      success: true,
      timestamp: 1620729364,
      base: 'EUR',
      date: '2021-05-11',
      rates: {
        USD: 1.215798,
        EUR: 1,
        NGN: 463.523319,
        GBP: 0.860159,
      },
    };
    const prom: Promise<any> = new Promise((resolve) => resolve(currencyRates));
    jest.spyOn(service, 'getRates').mockImplementation(() => prom);

    expect(await service.getRates()).toBe(currencyRates);
  });
});
