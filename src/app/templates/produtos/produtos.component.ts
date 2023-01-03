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
  listaDeTipos: String[] = [
    'Grãos',
    'Doces',
    'Hortifruti',
    'Bolachas e biscoitos',
    'Massas',
    'Temperos e Condimentos',
    'Laticíneos',
    'Padaria',
    'Carnes',
    'Friamberia',
    'Higiene e Limpeza',
    'Bebidas',
    'Bebidas Alcoolicas',
    'Outros',
  ];

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
  pegarProdutosPorDescricaoPaginados(descricao: string) {
    this.produtoService.pegarProdutosPorDescricaoPaginados(descricao).subscribe(
      (resposta) => {
        this.listaDeProdutos = resposta.content;
      },
      (error) => {
        console.log('Erro ao buscar produtos por descrição paginado');
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
    this.pegarProdutosPorDescricaoPaginados(this.descricao);
    console.log('Apertou');
  }
}
