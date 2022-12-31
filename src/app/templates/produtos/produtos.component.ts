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

  produtosTeste = [
    { descricao: 'Feijao', preco: 2.99, quantidade: 30 },
    { descricao: 'Arroz', preco: 1.99, quantidade: 40 },
    { descricao: 'Chips', preco: 4.99, quantidade: 200 },
  ];

  pegarTodosProdutosPaginado() {
    this.produtoService.pegarTodosProdutosPaginados().subscribe(
      (resposta) => {
        this.listaDeProdutos = resposta;
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
        console.log('Erro ao buscar produtos paginados');
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
    this.pegarTodosProdutos();
  }

  onSubmit(form: Object) {
    this.pegarProdutosPorDescricao(this.descricao);
  }
}
