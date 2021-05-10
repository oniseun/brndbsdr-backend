
import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../product.service';

@Controller()
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('products')
  getProducts(): Array<object> | object {
    return this.service.getProducts()
  }
}
