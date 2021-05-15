import { Resolver, Query } from '@nestjs/graphql';
import { Currency } from './currency.model';
import { CurrencyConverterService } from './currency.service';

@Resolver(of => Currency)
export class CurrencyResolver {
  constructor(private service: CurrencyConverterService) {}
  @Query(returns => Currency)
  async getRates(): Promise<Currency> {
    return this.service.getRates();
  }
}
