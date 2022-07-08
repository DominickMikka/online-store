import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = this.productsService.getProducts();

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

}
