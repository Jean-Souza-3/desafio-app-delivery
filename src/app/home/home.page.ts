import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Categoria } from '../categoria';
import { Produto } from '../produto';
import { ProdutoEscolhidoService } from '../service/produto-escolhido.service';
import { Storage } from '@ionic/storage-angular';
import { Carrinho } from '../carrinho';
import { element } from 'protractor';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  BASE_URL = 'http://lucasreno.kinghost.net/delivery';
  categorias: Categoria[] = [];
  carrinho: Carrinho[] = [];
  totalCarrinho: number = 0;

  constructor(private http: HttpClient, 
    private pe: ProdutoEscolhidoService,
    private storage: Storage
    ) {
    this.pegarDados();
    
  }

  ionViewWillEnter() {
    this.iniciarBanco();
  }

  async iniciarBanco() {
    await this.storage.create();
    this.carrinho = await this.storage.get('carrinho') ?? [];
    this.totalCarrinho = 0;
    this.carrinho.forEach(c => {
      this.totalCarrinho += c.quantidade * c.produto.valor;
    });
  }

  salvarProduto (p: Produto) {
    this.pe.produto = p;
  }

  pegarDados(){
    this.http.get<Categoria[]>(this.BASE_URL+'/categorias').subscribe(
      resposta => {
        this.categorias = resposta;
        this.categorias.forEach(cat => {
          this.http.get<Produto[]>(this.BASE_URL+'/produtos/'+cat.idCategoria).subscribe(
            resp => {
              cat.produtos = resp;
            }
          );
        });
      }
    );
  }
}
