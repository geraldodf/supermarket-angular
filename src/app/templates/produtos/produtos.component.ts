import { Component, OnInit } from '@angular/core';
import { ProdutoServiceService } from '../../pages/produto-service.service';
import { Produto } from '../../../models/Produto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class ProdutosComponent implements OnInit {
  constructor(private produtoService: ProdutoServiceService) {}

  listaDeProdutos: Produto[] = [];
  descricao: string = '';

  pegarTodosProdutosPaginados() {
    this.produtoService.pegarTodosProdutosPaginados().subscribe(
      (resposta) => {
        this.listaDeProdutos = resposta.content;
      },
      (error) => {
        console.log('Erro ao buscar produtos paginados');
      }
    );
  }
  pegarProdutosPorDescricao(descricao: string) {
    this.produtoService.pegarProdutosPorDescricao(descricao).subscribe(
      (resposta) => {
        this.listaDeProdutos = resposta;
      },
      (error) => {
        console.log('Erro ao buscar produtos por descrição');
      }
    );
  }

  pegarTodosProdutos() {
    this.produtoService.pegarProdutos().subscribe(
      (resposta) => {
        this.listaDeProdutos = resposta;
      },
      (error) => {
        console.log('Deu erro em pegar todos os produtos!');
      }
    );
  }
  ngOnInit(): void {
    this.pegarTodosProdutosPaginados();
  }

  onSubmit(form: Object) {
    this.pegarProdutosPorDescricao(this.descricao);
  }
}
