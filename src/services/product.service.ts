import { Injectable, Logger } from '@nestjs/common';
import { Product } from '../models/product.model';
import productsjson from '../../db/products.json'
const LOG_PREFIX : string = 'ProductService:'


@Injectable()
export class ProductService {
  getProducts() : Array<Product> | object{
    
    try {

      const products: Array<Product> = productsjson;
  
      return products

    } catch (error) {

      Logger.log(error.toString(),  LOG_PREFIX );

      throw error
    }

  }
  
}
