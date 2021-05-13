import { Controller, Get, Req } from '@nestjs/common';
import { LocationService } from '../services/location.service';

@Controller()
export class LocationController {
  constructor(private readonly service: LocationService) {}

  @Get('location/details')
  async getCurrent(@Req() req): Promise<Array<object> | object> {
    const clientIp: string = req.clientIp;
    return this.service.getLocationByIp(clientIp);
  }
}
