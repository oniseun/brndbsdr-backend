import { Test, TestingModule } from '@nestjs/testing';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import products from '../../db/products.json';

describe('ProductResolver', () => {
  let productResolver: ProductResolver;
  let productService: ProductService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ProductService, ProductResolver],
    }).compile();

    productResolver = app.get<ProductResolver>(ProductResolver);
    productService = app.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productResolver).toBeDefined();
  });

  describe('getProducts', () => {
    it('should get products', () => {
      expect(productService.getProducts()).toStrictEqual(products);
    });
  });
});
