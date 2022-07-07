import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() color?: string;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts();
  }

}
