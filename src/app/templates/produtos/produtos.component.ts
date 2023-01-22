import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../pages/product-service.service';
import { Product } from '../../../models/Product';
import { ProductType } from 'src/models/ProductType';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class ProdutosComponent implements OnInit {
  constructor(private produtoService: ProductServiceService) {}

  products: Product[] = [];
  types: ProductType[] = [];


  description: string = '';

  pegarTodosTiposDosProdutos() {
    this.produtoService.getAllProductTypesPaginated().subscribe(
      (resposta) => {
        this.types = resposta;
      }, (error) => {
        console.log('Erro ao buscar todos os tipos dos produtos paginados');
      }
    )
  }

  pegarTodosProdutosPaginados() {
    this.produtoService.getAllPaginatedProducts().subscribe(
      (resposta) => {
        this.products = resposta.content;
      },
      (error) => {
        console.log('Erro ao buscar produtos paginados');
      }
    );
  }

  pegarProdutosPorDescricaoPaginados(description: string) {
    this.produtoService.getProductsByDescriptionPaginated(description).subscribe(
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
