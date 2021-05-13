import { Controller, Get } from '@nestjs/common';
import { CurrencyRates } from '../models/currency-rates.model';
import { CurrencyConverterService } from '../services/currency.service';

@Controller()
export class CurrencyController {
  constructor(private readonly service: CurrencyConverterService) {}

  @Get('currency/rates')
  async getRates(): Promise<CurrencyRates | object> {
    return this.service.getRates();
  }
}
