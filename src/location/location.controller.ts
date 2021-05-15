import { Controller, Get, Req } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './location.model';

@Controller()
export class LocationController {
  constructor(private readonly service: LocationService) {}

  @Get('location/details')
  async getCurrent(@Req() req): Promise<Location> {
    const clientIp: string = req.clientIp;
    return this.service.getLocationByIp(clientIp);
  }
}
