import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyResolver } from './currency.resolver';
import { CurrencyConverterService } from './currency.service';

describe('CurrencyResolver', () => {
  let currencyResolver: CurrencyResolver;
  let currencyService: CurrencyConverterService;

  const currencyRates = {
    success: true,
    timestamp: 1620729364,
    base: 'EUR',
    date: '2021-05-11',
    rates: {
      USD: 1.215798,
      EUR: 1,
      NGN: 463.523319,
      GBP: 0.860159,
    },
  };

  const mockService = {
    getRates: () => currencyRates,
  };

  const currencyServiceProvider = {
    provide: CurrencyConverterService,
    useValue: mockService,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CurrencyResolver, currencyServiceProvider],
    }).compile();

    currencyService = app.get<CurrencyConverterService>(
      CurrencyConverterService,
    );
    currencyResolver = app.get<CurrencyResolver>(CurrencyResolver);
  });

  it('should be defined', () => {
    expect(currencyResolver).toBeDefined();
  });

  describe('getRates', () => {
    it('should return current currency rates', async () => {
      const prom: Promise<any> = new Promise((resolve) =>
        resolve(currencyRates),
      );
      jest.spyOn(currencyService, 'getRates').mockImplementation(() => prom);

      expect(await currencyResolver.getRates()).toBe(currencyRates);
    });
  });
});
