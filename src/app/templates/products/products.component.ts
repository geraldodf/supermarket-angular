import {Component, OnInit} from '@angular/core';
import {Product} from '../../../models/Product';
import {ProductType} from 'src/models/ProductType';
import {Router} from '@angular/router';
import {ProductServiceService} from "../product-service.service";
import {Page} from "../../../models/Page";
import {Sort} from "../../../models/Sort";

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

  // @ts-ignore
  private currentPage: Page = {
    content: [],
    pageable: '',
    totalElements: 0,
    last: false,
    totalPages: 0,
    size: 0,
    number: 0,
    numberOfElements: 0,
    first: false,
    empty: false
  };

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

  getAllProductsPaginated() {
    this.productsService.getAllPaginatedProducts().subscribe(
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
  private loadPage(pageNumber: number = 0, pageSize: number = 10): void {
    this.currentPage = {
      content: this.products.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize),
      pageable: '',
      totalElements: this.products.length,
      last: (pageNumber + 1) * pageSize >= this.products.length,
      totalPages: Math.ceil(this.products.length / pageSize),
      size: pageSize,
      number: pageNumber,
      numberOfElements: this.products.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize).length,
      first: pageNumber === 0,
      empty: !this.products.length
    };
  }

  public nextPage(): void {
    if (this.currentPage.last) {
      return;
    }
    this.loadPage(this.currentPage.number + 1, this.currentPage.size);
  }

  public prevPage(): void {
    if (this.currentPage.first) {
      return;
    }
    this.loadPage(this.currentPage.number - 1, this.currentPage.size);
  }

  public changePageSize(pageSize: number): void {
    this.loadPage(0, pageSize);
  }

  public setProducts(products: Product[]): void {
    this.products = products;
    this.loadPage();
  }

  ngOnInit(): void {
    this.getAllProductsPaginated();
    this.getAllProductsTypesPaginated();
  }

  onSubmit(form: Object) {
    this.getProductsPaginatedByDescription(this.description);
  }
}
