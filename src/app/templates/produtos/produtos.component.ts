import {Component, OnInit} from '@angular/core';
import {ProdutoServiceService} from "../../pages/produto-service.service";
import {Produto} from "../../../models/Produto";

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  constructor(private produtoService: ProdutoServiceService) {
  }

  listaDeProdutos: Produto[] = [];

  pegarTodosProdutos() {
    this.produtoService.pegarProdutos().subscribe(resposta => {
      this.listaDeProdutos = resposta;
      alert(resposta.forEach(p => p.quantidade))
      console.log(this.listaDeProdutos)
      console.log(this.listaDeProdutos.forEach(p => p))
    }, error => {
      console.log("Deu erro em pegar todos os produtos!")
    })
  }

  ngOnInit(): void {
    this.pegarTodosProdutos()
    console.log(this.listaDeProdutos.forEach( p => p))
  }
}
