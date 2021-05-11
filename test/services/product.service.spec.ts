

import { ProductService } from '../../src/services/product.service';
import * as products from '../../db/products.json'
describe('ProductService', () => {

  let service: ProductService;

  beforeEach(() => {
    service = new ProductService()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should get products', async () => {

    expect(service.getProducts()).toStrictEqual(products);
  });

 
});