import { Controller, Get } from '@nestjs/common';
import { CurrencyConverterService } from '../services/currency.service';

@Controller()
export class CurrencyController {
  constructor(private readonly service: CurrencyConverterService) {}

  @Get('currency/rates')
  async getRates(): Promise<Array<object> | object> {
    return this.service.getRates()
  }
}
