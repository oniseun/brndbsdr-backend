import { Resolver, Query } from '@nestjs/graphql';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Resolver(of => Product)
export class ProductResolver {
  constructor(private service: ProductService) {}
  @Query(returns => [Product])
  getProducts(): Array<Product> {
    return this.service.getProducts();
  }
}
