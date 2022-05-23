import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produto} from "../../models/Produto";

@Injectable({
  providedIn: 'root'
})
export class ProdutoServiceService {

  constructor(private http: HttpClient) {
  }

  endpoint = 'http://localhost:8080/api/produtos';

  pegarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.endpoint)
  }

}
