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

    }, error => {
      console.log("Deu erro em pegar todos os produtos!")
    })
  }

  ngOnInit(): void {
    this.pegarTodosProdutos()

  }
}
