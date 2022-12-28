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

  listaDeTodosProdutos: Produto[] = [];
  listaTodosProdutosPaginada: Produto[] = [];

  produtosTeste = [
    { descricao: 'Feijao', preco: 2.99, quantidade: 30 },
    { descricao: 'Arroz', preco: 1.99, quantidade: 40 },
    { descricao: 'Chips', preco: 4.99, quantidade: 200 },
  ];

  pegarTodosProdutosPaginado() {
    this.produtoService.pegarTodosProdutosPaginados().subscribe((resposta) => {
      this.listaTodosProdutosPaginada = resposta;
    },
    (error) => {
      console.log('Erro ao buscar produtos paginados');
    });
  }

  pegarTodosProdutos() {
    this.produtoService.pegarProdutos().subscribe(
      (resposta) => {
        this.listaDeTodosProdutos = resposta;
      },
      (error) => {
        console.log('Deu erro em pegar todos os produtos!');
      }
    );
  }

  ngOnInit(): void {
    this.pegarTodosProdutos();
  }
}
