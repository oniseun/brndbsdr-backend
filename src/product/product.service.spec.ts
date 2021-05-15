import { ProductService } from '../../src/product/product.service';
import products from '../../db/products.json';
describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    service = new ProductService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should get products', () => {
    expect(service.getProducts()).toStrictEqual(products);
  });
});
