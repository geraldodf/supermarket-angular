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

  ngOnInit() {
    this.loadProducts();
    this.initCart();
  }

  initCart(){
    this.productService.getProductsCart().forEach(p => this.addProduct(p))
  }
  addProduct(product: Product) {
    this.productList.push(product);
    this.saveProducts();
  }

  removeProduct(product: Product) {
    const index = this.productList.indexOf(product);
    if (index > -1) {
      this.productList.splice(index, 1);
      this.saveProducts();
    }
  }

  saveProducts() {
    localStorage.setItem('productList', JSON.stringify(this.productList));
  }

  loadProducts() {
    const storedProducts = localStorage.getItem('productList');
    if (storedProducts) {
      this.productList = JSON.parse(storedProducts);
    }
  }
}
