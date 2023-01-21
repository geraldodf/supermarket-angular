import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../models/Product';
import {Page} from 'src/models/Page';
import {ProductType} from 'src/models/ProductType';

@Injectable({
  providedIn: 'root',
})
export class ProdutoServiceService {
  constructor(private http: HttpClient) {
  }

  tipoSort = 'asc';
  paramSort = 'description';
  pageNumber = 0;
  pageSize = 20;
  description = '';

  endpoint = 'http://localhost:8080/api/products';

  endpointAllPaged =
    `${this.endpoint}/products?page=${this.pageNumber}size=${this.pageSize}&sort=${this.paramSort},${this.tipoSort}`;

  endpointDescriptionPaged = `${this.endpoint}/products-description?page=${this.pageNumber}&size=${this.pageSize}&sort&description=${this.description}`;
  endpointTipoDosProdutosPaginados = 'http://localhost:8080/api/products-types/types?sort=nameProductType,asc';

  pegarProdutos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.endpoint);
  }

  pegarTodosProdutosPaginados(): Observable<Page> {
    return this.http.get<Page>(this.endpointAllPaged);
  }

  pegarProdutosPorDescricao(descricao: string) {
    return this.http.get<Product[]>(this.endpointDescriptionPaged + descricao);
  }

  pegarProdutosPorDescricaoPaginados(description: string): Observable<any> {
    this.description = description;
    return this.http.get<Page>(this.endpointDescriptionPaged + description);
  }

  pegarTodosTiposDosProdutosPaginados(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.endpointTipoDosProdutosPaginados);
  }
}
