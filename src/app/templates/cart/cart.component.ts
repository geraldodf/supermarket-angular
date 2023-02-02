import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from "../product-service.service";
import {Product} from "../../../models/Product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private productService: ProductServiceService) {
  }

  productList: Product[] = [];

  ngOnInit(): void {
    this.productList = this.productService.getProductsListCart()
  }
}
