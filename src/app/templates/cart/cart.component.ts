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
  salePrice: number = 0;

  ngOnInit() {
    this.loadProducts();
    this.initCart();
    this.updateProductSalePrice();
    this.updateSalePrice()
  }

  initCart() {
    this.productService.getProductsCart().forEach(p => {
      this.addProduct(p)
    })
  }

  addProduct(product: Product): void {
    const existingProductIndex = this.productList.findIndex(p => p.id === product.id);
    if (existingProductIndex !== -1) {
      // @ts-ignore
      this.productList[existingProductIndex].quantitySelected++;
      // @ts-ignore
      this.productList[existingProductIndex].priceTotalSale = this.productList[existingProductIndex].priceSale * this.productList[existingProductIndex].quantitySelected;

    } else {
      this.productList.push({...product, quantitySelected: 1});
    }
    this.saveProducts();
  }


  removeProduct(product: Product) {
    const index = this.productList.indexOf(product);
    if (index > -1) {
      this.productList.splice(index, 1);
    }
    this.updateProductSalePrice();
  }

  saveProducts() {
    localStorage.setItem('productList', JSON.stringify(this.productList));
  }

  updateQuantity(quantity: number, product: Product): void {

    const index = this.productList.findIndex(p => p.id === product.id);
    // @ts-ignore
    this.productList[index].quantitySelected = quantity;
    // @ts-ignore
    this.productList[index].priceTotalSale = this.productList[index].priceSale * this.productList[index].quantitySelected;

    this.updateProductSalePrice();
    this.saveProducts();
  }

  loadProducts() {
    const storedProducts = localStorage.getItem('productList');
    if (storedProducts) {
      this.productList = JSON.parse(storedProducts);
    }
  }

  updateProductSalePrice() {
    this.productList.forEach(p => {
      if (p.quantitySelected === 1) {
        p.priceTotalSale = p.priceSale;
      }
    });
    this.updateSalePrice()
    this.saveProducts();
  }

  updateSalePrice() {
    this.salePrice = 0
    this.productList.forEach(p => {
      if (p.priceTotalSale != undefined) {
        this.salePrice += p.priceTotalSale;
      }
    })
  }
}
