import {Component, OnInit} from '@angular/core';
import {Product} from '../../../models/Product';
import {ProductType} from 'src/models/ProductType';
import {Router} from '@angular/router';
import {ProductServiceService} from "../product-service.service";
import {Page} from "../../../models/Page";

@Component({
  selector: 'app-produtos',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private productsService: ProductServiceService, private router: Router) {
  }

  products: Product[] = [];
  page: Page | undefined;
  types: ProductType[] = [];
  description: string = '';
  nameTypeSelected: string = '';
  currentPage: number = 0;


  ngOnInit(): void {
    this.getAllProductsPaginated(this.currentPage);
    this.getAllProductsTypesPaginated();
  }

  onSubmit(form: Object) {
    this.getProductsPaginatedByDescription(this.description);
  }

  addToCart(product: Product) {
    this.productsService.addToCart(product);
  }

  getAllProductsTypesPaginated() {
    this.productsService.getAllProductTypesPaginated().subscribe(
      (types) => {
        this.types = types;
      }, (error) => {
        console.log('Error when fetching all types of paginated products.', error);
      }
    )
  }

  getAllProductsPaginated(pageSelected: number) {
    this.currentPage = pageSelected;
    this.productsService.getAllPaginatedProducts(this.currentPage).subscribe(
      (page) => {
        this.products = page.content;
        this.page = page;
      },
      (error) => {
        console.log('Error when fetching all products paginated.', error);
      }
    );
  }

  getProductsPaginatedByDescription(description: string) {
    this.productsService.getProductsByDescriptionPaginated(description).subscribe(
      (products) => {
        this.products = products.content;
      },
      (error) => {
        console.log('Error when fetching products by description paginated.', error);
      }
    );
  }

  getProductsByProductType(type: ProductType) {
    this.productsService.getProductsByProductType(type).subscribe(
      (products) => {
        this.products = products;
        this.nameTypeSelected = type.nameProductType;
        console.log(this.nameTypeSelected)
      },
      (error) => {
        console.log('Error when fetching products by description paginated.', error);
      }
    );
  }

  cart() {
    this.router.navigate(['/cart'])
  }
}
