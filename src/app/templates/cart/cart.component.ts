import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private productService: ProductServiceService) {}

  productList: Product[] = [];
  list: Product[] = [];
  salePrice: number = 0;
  showPayments = true;
  selectedPaymentMethod = 'credito';

  cardName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;

  name: string;
  surname: string;
  phoneNumber: string;
  phoneNumberReserve: string;
  email: string;
  adress: string;
  city: string = "Escolha...";
  complement: string;


  ngOnInit() {
    this.loadProducts();
    this.initCart();
    this.updateProductSalePrice();
    this.updateSalePrice();
  }

  initCart() {
    this.productService.getProductsCart().forEach((p) => {
      this.addProduct(p);
    });
  }

  addProduct(product: Product): void {
    const existingProductIndex = this.productList.findIndex(
      (p) => p.id === product.id
    );
    if (existingProductIndex !== -1) {
      this.productList[existingProductIndex].quantitySelected++;
      this.productList[existingProductIndex].priceTotalSale =
        this.productList[existingProductIndex].priceSale *
        this.productList[existingProductIndex].quantitySelected;
    } else {
      this.productList.push({ ...product, quantitySelected: 1 });
    }
    this.saveProducts();
  }

  cleanCart() {
    localStorage.setItem('productList', JSON.stringify(this.list));
    this.loadProducts();
    this.updateSalePrice();
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
    const index = this.productList.findIndex((p) => p.id === product.id);
    this.productList[index].quantitySelected = quantity;
    this.productList[index].priceTotalSale =
      this.productList[index].priceSale *
      this.productList[index].quantitySelected;

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
    this.productList.forEach((p) => {
      if (p.quantitySelected === 1) {
        p.priceTotalSale = p.priceSale;
      }
    });
    this.updateSalePrice();
    this.saveProducts();
  }

  updateSalePrice() {
    this.salePrice = 0;
    this.productList.forEach((p) => {
      if (p.priceTotalSale != undefined) {
        this.salePrice += p.priceTotalSale;
      }
    });
  }

  paymentMethod() {
    console.log('Finalizei a venda!');
  }

  confirmAction() {
    if (confirm('Tem certeza que deseja continuar?')) {
      console.log('Sim');
    } else {
      console.log('Sim');
    }
  }
}
