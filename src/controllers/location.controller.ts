import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from '../services/location.service';

@Controller()
export class LocationController {
  constructor(private readonly service: LocationService) {}

  @Get('location/details/:ip')
  async getCurrent(@Param('ip') Ip: string): Promise<Array<object> | object> {
    return this.service.getLocationByIp(Ip)
  }
}
