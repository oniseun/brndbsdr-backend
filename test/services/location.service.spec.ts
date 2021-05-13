import { LocationService } from '../../src/services/location.service';
import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from '../../src/services/redis-cache.service';
import { Cache } from 'cache-manager';
describe('LocationService', () => {
  let service: LocationService;
  let httpService: HttpService;
  let configService: ConfigService;
  let redis: RedisCacheService;
  beforeEach(() => {
    httpService = new HttpService();
    configService = new ConfigService();
    redis = new RedisCacheService(Cache);
    service = new LocationService(httpService, configService, redis);
  });

  it('should get location details by ip address', async () => {
    const locationDetails = {
      ip: '8.8.8.8',
      city: 'Mountain View',
      region: 'California',
      region_code: 'CA',
      country_code: 'US',
      country_code_iso3: 'USA',
      country_name: 'United States',
      country_capital: 'Washington',
      country_tld: '.us',
      continent_code: 'NA',
      in_eu: false,
      postal: '94035',
      latitude: 37.386,
      longitude: -122.0838,
      timezone: 'America/Los_Angeles',
      utc_offset: '-0700',
      country_calling_code: '+1',
      currency: 'USD',
      currency_name: 'Dollar',
      languages: 'en-US,es-US,haw',
      asn: 'AS15169',
      org: 'Google LLC',
    };
    const ip = '8.8.8.8';
    const prom: Promise<object> = new Promise((resolve) =>
      resolve(locationDetails),
    );
    jest.spyOn(service, 'getLocationByIp').mockImplementation(() => prom);

    expect(await service.getLocationByIp(ip)).toBe(locationDetails);
  });
});
