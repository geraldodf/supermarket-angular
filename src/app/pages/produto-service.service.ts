import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../../models/Produto';
import { Page } from 'src/models/Page';

@Injectable({
  providedIn: 'root',
})
export class ProdutoServiceService {

  constructor(private http: HttpClient) {}

  endpoint = 'http://localhost:8080/api/produtos';

  endpointPaginado =
    'http://localhost:8080/api/produtos/pag?page=0&size=20&sort=descricao,asc';

    endpointDescricaoPaginado =
    'http://localhost:8080/api/produtos/pagDesc?page=0size=20&sort=descricao,asc&descricao=';


  endpointDescricao =
    'http://localhost:8080/api/produtos/pesquisa-por-descricao?descricao=';

    tipoSort = 'asc';
    pagina = 0;
    tamanhoPagina = 20;
    paramPaginacao = 'descricao';

  pegarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.endpoint);
  }

  pegarTodosProdutosPaginados(): Observable<any> {
    return this.http.get<Page>(this.endpointPaginado);
  }

  pegarProdutosPorDescricao(descricao: string) {
    return this.http.get<Produto[]>(this.endpointDescricao + descricao);
  }

  pegarProdutosPorDescricaoPaginados(descricao: string): Observable<any>{
    return this.http.get<Page>(this.endpointDescricaoPaginado + descricao );
  }

}
