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
  page: Page;
  types: ProductType[] = [];
  description: string = '';
  currentPage: number = 0;
  nameTypeSelected: string = '';
  typeSelected: ProductType;
  inPagination: boolean = false;



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
        this.currentPage = 0;
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
        if (!this.inPagination) {
          this.currentPage = 0;
        }
        this.products = page.content;
        this.page = page;
        this.inPagination = false;
      },
      (error) => {
        console.log('Error when fetching all products paginated.', error);
      }
    );
  }

  getProductsPaginatedByDescription(description: string) {
    this.productsService.getProductsByDescriptionPaginated(description, this.currentPage).subscribe(
      (page) => {
        if (!this.inPagination) {
          this.currentPage = 0;
        }
        this.products = page.content;
        this.inPagination = false;
      },
      (error) => {
        console.log('Error when fetching products by description paginated.', error);
      }
    );
  }

  getProductsByProductType(type: ProductType) {
    this.productsService.getProductsByProductType(type, this.currentPage).subscribe(
      (page) => {
        if (!this.inPagination) {
          this.currentPage = 0;
        }
        this.products = page.content;
        this.typeSelected = type;
        this.nameTypeSelected = type.nameProductType;
        this.inPagination = false;
      },
      (error) => {
        console.log('Error when fetching products by description paginated.', error);
      }
    );
  }

  cart() {
    this.router.navigate(['/cart'])
  }

  nextPage() {
    this.currentPage += 1;
    this.verifyPagination();
  }

  previousPage() {
    this.currentPage -= 1;
    this.verifyPagination();

  }

  specificPage(page: number) {
    this.currentPage = page;
    this.verifyPagination();
  }


  verifyPagination() {
    this.inPagination = true;
    if (this.description.length > 0) {
      this.getProductsPaginatedByDescription(this.description);
    } else if (this.typeSelected?.id != 0) {
      if (this.typeSelected != undefined) {
        this.getProductsByProductType(this.typeSelected);
      }
    }
    if (this.description.length < 1 && this.typeSelected?.id == undefined) {
      this.getAllProductsPaginated(this.currentPage);
    }

  }
}
