import { Component, OnInit } from '@angular/core';
import {Produto} from "../../../models/Produto";
import {ProdutoServiceService} from "../produto-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private produtoService: ProdutoServiceService) { }

  listaDeProdutos: Produto[] = [];

  pegarTodosProdutos(){
    this.produtoService.pegarProdutos().subscribe( resposta => {
      this.listaDeProdutos = resposta;
      alert(resposta)
    }, error => {
      console.log("Deu erro aqui véi")
    })
  }

  ngOnInit(): void {
    this.pegarTodosProdutos()
    console.log("Aqui ------------------------------")
  }

}
