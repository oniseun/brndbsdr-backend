import { Test, TestingModule } from '@nestjs/testing';
import { LocationResolver } from './location.resolver';
import { LocationService } from './location.service';

describe('LocationResolver', () => {
  let locationResolver: LocationResolver;
  let locationService: LocationService;

  const locationDetails = {
    ip: '8.8.8.8',
    city: 'Mountain View',
    region: 'California',
    region_code: 'CA',
    country_code: 'US',
    country_name: 'United States',
    country_capital: 'Washington',
    timezone: 'America/Los_Angeles',
    utc_offset: '-0700',
    country_calling_code: '+1',
    currency: 'USD',
    currency_name: 'Dollar',
    languages: 'en-US,es-US,haw',
  };

  const mockService = {
    getLocationByIp: () => locationDetails,
  };

  const locationServiceProvider = {
    provide: LocationService,
    useValue: mockService,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [LocationResolver, locationServiceProvider],
    }).compile();

    locationService = app.get<LocationService>(LocationService);
    locationResolver = app.get<LocationResolver>(LocationResolver);
  });

  it('should be defined', () => {
    expect(locationResolver).toBeDefined();
  });

  describe('getRates', () => {
    it('should return location details by Ip', async () => {
      const ctx = { req: { clientIp: '8.8.8.8' } };
      const prom: Promise<any> = new Promise((resolve) =>
        resolve(locationDetails),
      );
      jest
        .spyOn(locationService, 'getLocationByIp')
        .mockImplementation(() => prom);

      expect(await locationResolver.getLocationByIp(ctx)).toBe(locationDetails);
    });
  });
});
