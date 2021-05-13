
import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from '../../src/controllers/location.controller';
import { LocationService } from '../../src/services/location.service';

describe('CurrencyController', () => {
  let locationController: LocationController;
  let locationService: LocationService;

 const locationDetails=  {
    "ip" : "8.8.8.8",
    "city" : "Mountain View",
    "region" : "California",
    "region_code" : "CA",
    "country_code" : "US", 
    "country_name" : "United States",
    "country_capital" : "Washington",
    "timezone" : "America/Los_Angeles",
    "utc_offset" : "-0700",
    "country_calling_code" : "+1",
    "currency" : "USD",
    "currency_name" : "Dollar",
    "languages" : "en-US,es-US,haw"
    }

  const mockService = {
    getLocationByIp: () => (locationDetails),
  };

  const locationServiceProvider = {
    provide: LocationService,
    useValue: mockService,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [locationServiceProvider],
    }).compile();

    locationService = app.get<LocationService>(LocationService);
    locationController = app.get<LocationController>(LocationController);
  });

  it('should be defined', () => {
    expect(locationController).toBeDefined();
  });

  describe('getRates', () => {
    it('should return location details by Ip', async () => {
      const req = { clientIp: '8.8.8.8' };
      const prom : Promise<object> = new Promise(resolve => resolve(locationDetails));
      jest.spyOn(locationService, 'getLocationByIp').mockImplementation(() => prom);

      expect(await locationController.getCurrent(req)).toBe(locationDetails);
    });
  });
});


