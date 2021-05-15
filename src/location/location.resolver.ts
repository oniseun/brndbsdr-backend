import { Resolver, Query, Context } from '@nestjs/graphql';
import { Location } from './location.model';
import { LocationService } from './location.service';
// import JSON from 'graphql-type-json';

@Resolver(of => Location)
export class LocationResolver {
  constructor(private service: LocationService) {}
  @Query(returns => Location)
  async getLocationByIp(@Context() ctx): Promise<object> {
    const clientIp: string = ctx.req.clientIp;
    return this.service.getLocationByIp(clientIp);
  }
}
