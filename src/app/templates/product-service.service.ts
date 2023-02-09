import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../models/Product';
import {Page} from 'src/models/Page';
import {ProductType} from 'src/models/ProductType';
import {CartComponent} from "./cart/cart.component";

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private http: HttpClient) {
  }

  productsToCart: Product[] = [];
  sortType = 'asc';
  paramSort = 'description';
  pageNumber = 0;
  pageSize = 20;
  description = '';

  endpoint = 'http://localhost:8080/api/products';
  endpointDescriptionPaged = `${this.endpoint}/products-description?page=${this.pageNumber}&size=${this.pageSize}&sort=description,asc&description=${this.description}`;
  endpointPaginatedProductByProductTypeId = `${this.endpoint}/products-type-id?page=${this.pageNumber}&size=${this.pageSize}&sort=description,asc`
  endpointPaginatedProductTypes = 'http://localhost:8080/api/products-types/types?sort=nameProductType,asc';


  addToCart(product: Product) {
    this.productsToCart.push(product);
  }

  getProductsCart(): Product[] {
    return this.productsToCart;
  }


  getAllPaginatedProducts(pageNumber: number, pageSize?: number): Observable<Page> {
    this.pageNumber = pageNumber;
    return this.http.get<Page>(`${this.endpoint}/products?page=${this.pageNumber}&size=${this.pageSize}&sort=${this.paramSort},${this.sortType}`);
  }

  getProductsByDescriptionPaginated(description: string): Observable<any> {
    this.description = description;
    return this.http.get<Page>(this.endpointDescriptionPaged + description);
  }

  getAllProductTypesPaginated(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.endpointPaginatedProductTypes);
  }

  getProductsByProductType(type: ProductType): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.endpointPaginatedProductByProductTypeId}&typeId=${type.id}`);
  }


}