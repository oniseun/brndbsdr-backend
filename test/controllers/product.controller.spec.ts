import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../../src/controllers/product.controller';
import { ProductService } from '../../src/services/product.service';

describe('ProductController', () => {
  let productController: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });
});
