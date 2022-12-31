import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../../models/Produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoServiceService {
  constructor(private http: HttpClient) {}

  endpoint = 'http://localhost:8080/api/produtos';

  endpointPaginado =
    'http://localhost:8080/api/produtos/pag?page=0&size=20&sort=descricao,asc';

  endpointDescricao =
    'http://localhost:8080/api/produtos/pesquisa-por-descricao?descricao=';


  pegarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.endpoint);
  }

  pegarTodosProdutosPaginados(): Observable<any> {
    return this.http.get<any>(this.endpointPaginado);
  }

  pegarProdutosPorDescricao(descricao: string) {
    return this.http.get<Produto[]>(this.endpointDescricao + descricao);
  }
}
