import { Controller, Get } from '@nestjs/common';
import { Currency } from './currency.model';
import { CurrencyConverterService } from './currency.service';

@Controller()
export class CurrencyController {
  constructor(private readonly service: CurrencyConverterService) {}

  @Get('currency/rates')
  async getRates(): Promise<Currency> {
    return this.service.getRates();
  }
}
