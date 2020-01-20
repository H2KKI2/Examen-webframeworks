import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable()
export class ProductService {


   constructor() {
      
   }

   // Get all products
   products = [new Product("appelsap", "MinuteMade", "Lekkere appelsap", 2), new Product("Fruitsap", "MinuteMade", "Lekkere Fruitsap", 3)];
   getAllProducts() : Product[] {
      return this.products;
   }
}
