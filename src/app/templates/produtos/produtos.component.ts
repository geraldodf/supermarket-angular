import { Component, OnInit } from '@angular/core';
import { ProdutoServiceService } from '../../pages/produto-service.service';
import { Product } from '../../../models/Product';
import { ProductType } from 'src/models/ProductType';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class ProdutosComponent implements OnInit {
  constructor(private produtoService: ProdutoServiceService) {}

  products: Product[] = [];
  types: ProductType[] = [];


  description: string = '';

  pegarTodosTiposDosProdutos() {
    this.produtoService.pegarTodosTiposDosProdutosPaginados().subscribe(
      (resposta) => {
        this.types = resposta;
      }, (error) => {
        console.log('Erro ao buscar todos os tipos dos produtos paginados');
      }
    )
  }

  pegarTodosProdutosPaginados() {
    this.produtoService.pegarTodosProdutosPaginados().subscribe(
      (resposta) => {
        this.products = resposta.content;
      },
      (error) => {
        console.log('Erro ao buscar produtos paginados');
      }
    );
  }
  pegarProdutosPorDescricao(descricao: string) {
    this.produtoService.pegarProdutosPorDescricao(descricao).subscribe(
      (resposta) => {
        this.products = resposta;
      },
      (error) => {
        console.log('Erro ao buscar produtos por descrição');
      }
    );
  }
  pegarProdutosPorDescricaoPaginados(description: string) {
    this.produtoService.pegarProdutosPorDescricaoPaginados(description).subscribe(
      (resposta) => {
        this.products = resposta.content;
      },
      (error) => {
        console.log('Erro ao buscar produtos por descrição paginado');
      }
    );
  }

  ngOnInit(): void {
    this.pegarTodosProdutosPaginados();
    this.pegarTodosTiposDosProdutos();
  }

  onSubmit(form: Object) {
    this.pegarProdutosPorDescricaoPaginados(this.description);
  }
}
