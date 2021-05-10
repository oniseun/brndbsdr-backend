import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
const LOG_PREFIX : string = 'ProductService:'


@Injectable()
export class ProductService {
  getProducts() : object{
    
    try {

      const productFile: string = fs.readFileSync(path.resolve(process.cwd(),`../db/products.json`)).toString()
  
      const products: object = JSON.parse(productFile);
  
      return products

    } catch (error) {

      Logger.log(error.toString(),  LOG_PREFIX );

      throw error
    }

  }
  
}
