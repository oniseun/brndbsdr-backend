
import { Controller, Get } from '@nestjs/common';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Controller()
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('products')
  getProducts(): Array<Product> | object {
    return this.service.getProducts()
  }
}
