import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Carrinho } from '../carrinho';
import { Produto } from '../produto';
import { ProdutoEscolhidoService } from '../service/produto-escolhido.service';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.page.html',
  styleUrls: ['./detalhe.page.scss'],
})
export class DetalhePage implements OnInit {
  produto: Produto;
  quantidade: number = 1;
  carrinho: Carrinho[];

  constructor(private pe: ProdutoEscolhidoService,
    private storage: Storage
    ) { 
    this.produto = pe.produto;
    this.iniciarBanco();
  }

  async iniciarBanco() {
    await this.storage.create();
    this.carrinho = await this.storage.get('carrinho') ?? [];
  }

  async addProduto() {
    this.carrinho.push({quantidade: this.quantidade, produto: this.produto});
    await this.storage.set('carrinho', this.carrinho);
  }

  subQtd() {
    if (this.quantidade > 1) {
      this.quantidade--;
    }
  }

  addQtd() {
    this.quantidade++;
  }

  ngOnInit() {
  }

}
