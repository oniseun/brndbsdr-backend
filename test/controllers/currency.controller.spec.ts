import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyController } from '../../src/controllers/currency.controller';
import { CurrencyConverterService } from '../../src/services/currency.service';

describe('CurrencyController', () => {
  let currencyController: CurrencyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [CurrencyConverterService],
    }).compile();

    currencyController = app.get<CurrencyController>(CurrencyController);
  });

  it('should be defined', () => {
    expect(CurrencyController).toBeDefined();
  });
});
