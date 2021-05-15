import { Controller, Get } from '@nestjs/common';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('products')
  getProducts(): Array<Product> | any {
    return this.service.getProducts();
  }
}
