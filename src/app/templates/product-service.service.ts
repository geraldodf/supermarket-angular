import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/Product';
import { Page } from 'src/models/Page';
import { ProductType } from 'src/models/ProductType';
import { SaleDto } from 'src/models/SaleDto';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private http: HttpClient) {}

  productsToCart: Product[] = [];
  sortType = 'asc';
  paramSort = 'description';
  currentPage: number = 0;
  pageSize = 9;
  description = '';

  endpoint = 'http://localhost:8080/api/products';
  endpointPaginatedProductTypes =
    'http://localhost:8080/api/products-types/types?sort=nameProductType,asc';

  addToCart(product: Product) {
    this.productsToCart.push(product);
  }

  getProductsCart(): Product[] {
    return this.productsToCart;
  }

  getAllPaginatedProducts(
    currentPage?: number,
    pageSize?: number
  ): Observable<Page> {
    if (pageSize != null) {
      this.pageSize = pageSize;
    }
    if (currentPage != null) {
      this.currentPage = currentPage;
    }

    return this.http.get<Page>(
      `${this.endpoint}/page?page=${this.currentPage}&size=${this.pageSize}&sort=${this.paramSort},${this.sortType}`
    );
  }

  getProductsByDescriptionPaginated(
    description: string,
    currentPage?: number,
    pageSize?: number
  ): Observable<Page> {
    if (pageSize != null) {
      this.pageSize = pageSize;
    }
    if (currentPage != null) {
      this.currentPage = currentPage;
    }

    this.description = description;
    return this.http.get<Page>(
      `${this.endpoint}/page?page=${this.currentPage}&size=${this.pageSize}&sort=${this.paramSort},${this.sortType}&description=${description}`
    );
  }

  getAllProductTypesPaginated(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.endpointPaginatedProductTypes);
  }

  getProductsByProductType(
    type: ProductType,
    currentPage?: number,
    pageSize?: number
  ): Observable<Page> {
    if (pageSize != null) {
      this.pageSize = pageSize;
    }
    if (currentPage != null) {
      this.currentPage = currentPage;
    }
    return this.http.get<Page>(
      `${this.endpoint}/page?page=${this.currentPage}&size=${this.pageSize}&sort=${this.paramSort},${this.sortType}&typeId=${type.id}`
    );
  }

  createSale(sale: SaleDto) {
    console.log('antes');
    this.http.post<SaleDto>('http://localhost:8080/api/sales', sale).subscribe(
      (response) => console.log("Sale was create."), // manipular a resposta da solicitação
      (error) => console.log("Error on creating sale.") // manipular o erro da solicitação
    );
    console.log('depois');
  }
}
