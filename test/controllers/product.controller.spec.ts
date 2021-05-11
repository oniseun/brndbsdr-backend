import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../../src/controllers/product.controller';
import { ProductService } from '../../src/services/product.service';
import products from '../../db/products.json'

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productController = app.get<ProductController>(ProductController);
    productService = app.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('getProducts', () => {
    it('should get products', () => {
      expect(productService.getProducts()).toStrictEqual(products);
    });
  });
});
