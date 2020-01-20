import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';

@Injectable()
export class ProductService {

   private productsServiceURI: string = 'http://localhost:3000/products';
   private contentHeaders: HttpHeaders;

   constructor(private http: HttpClient) {
      this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
   }

   // Get all products
   products = [new Product("appelsap", "MinuteMade", "Lekkere appelsap", 2), new Product("Fruitsap", "MinuteMade", "Lekkere Fruitsap", 3)];
   getAllProducts() : Product[] {
      return this.products;
   }
}
