import { Injectable, Logger } from '@nestjs/common';
import * as productsjson from '../../db/products.json'
const LOG_PREFIX : string = 'ProductService:'


@Injectable()
export class ProductService {
  getProducts() : object{
    
    try {

      const products: object = productsjson;
  
      return products

    } catch (error) {

      Logger.log(error.toString(),  LOG_PREFIX );

      throw error
    }

  }
  
}
