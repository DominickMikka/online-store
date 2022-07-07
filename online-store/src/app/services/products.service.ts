import { Injectable } from '@angular/core';
import { allProducts } from '../allProducts';
import { Product } from '../Product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProducts(): Product[] {
    const products: Product[] = allProducts;

    return products
  }
}
