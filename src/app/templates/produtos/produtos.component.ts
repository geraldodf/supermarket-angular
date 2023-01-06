import { Component, OnInit } from '@angular/core';
import { ProdutoServiceService } from '../../pages/produto-service.service';
import { Produto } from '../../../models/Produto';
import { TipoDoProduto } from 'src/models/TipoDoProduto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class ProdutosComponent implements OnInit {
  constructor(private produtoService: ProdutoServiceService) {}

  listaDeProdutos: Produto[] = [];
  listaDeTipos: TipoDoProduto[] = [];


  descricao: string = '';

  pegarTodosTiposDosProdutos() {
    this.produtoService.pegarTodosTiposDosProdutosPaginados().subscribe(
      (resposta) => {
        this.listaDeTipos = resposta.content;
      }, (error) => {
        console.log('Erro ao buscar todos os tipos dos produtos paginados');
      }
    )
  }
  pegarTipoDoProdutoPorId(id: number) {
    this.produtoService.pegarTipoDoProdutoPorId(id).subscribe(
      (resposta) => {
        console.log(resposta)
      }, (error) => {
        console.log('Erro ao buscar tipo do produto pelo id');
      }
    )
  }

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
    this.pegarTodosTiposDosProdutos();
  }

  onSubmit(form: Object) {
    this.pegarProdutosPorDescricaoPaginados(this.descricao);
  }
}
