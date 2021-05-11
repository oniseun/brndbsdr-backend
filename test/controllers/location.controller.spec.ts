import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from '../../src/controllers/location.controller';
import { LocationService } from '../../src/services/location.service';

describe('LocationController', () => {
  let locationController: LocationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [LocationService],
    }).compile();

    locationController = app.get<LocationController>(LocationController);
  });

  it('should be defined', () => {
    expect(locationController).toBeDefined();
  });
});
