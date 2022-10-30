import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Carrinho } from '../carrinho';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  carrinho: Carrinho[] = [];
  totalCarrinho: number = 0;
  nome = null;
  telefone = null;
  entrega = null;
  endereco = null;
  pagamento = null;
  mostrarEndereco = false;

  constructor(private storage: Storage,
    private router: Router) { }

  ngOnInit() {
  }

  async iniciarBanco(){
    this.storage.create();
    this.carrinho = await this.storage.get('carrinho') ?? [];
    this.totalCarrinho = 0;
    this.carrinho.forEach(c => {
      this.totalCarrinho += c.quantidade * c.produto.valor;
    });
  }

  ionViewWillEnter(){
    this.iniciarBanco();
  }

  enviarPedido(){
    let texto = '';
    texto += 'Nome: ' + this.nome + '\n';
    texto += 'Telefone: ' + this.telefone + '\n';
    texto += 'Tipo de entrega: ' + this.entrega + '\n';
    if (this.entrega == 'delivery') {
      texto += 'Endereço: ' + this.endereco + '\n';
    }
    texto += 'Forma de pagamento: ' + this.pagamento + '\n';
    texto += '\nPedido: ';
    this.carrinho.forEach(c => {
      texto += '\n' + c.quantidade + 'x' + c.produto.nome;
      texto += '                R$ ' + (c.quantidade * c.produto.valor).toFixed(2)
    });
    texto += '\nTotal:';
    texto += '                R$' + this.totalCarrinho.toFixed(2);
    const url = 'https://api.whatsapp.com/send?phone=5515996580305&text=' + encodeURI(texto);
    window.open(url,'_blank').focus();
    
  }

  verificar(){
    if (this.entrega == 'delivery') {
      this.mostrarEndereco = true;
    }else{
      this.mostrarEndereco = false;
    }
  }

  remover(indice){
    this.carrinho.splice(indice, 1);
    this.storage.set('carrinho', this.carrinho);
    if(this.carrinho.length == 0)
      this.router.navigateByUrl('/');
    this.totalCarrinho = 0;
    this.carrinho.forEach(c => {
      this.totalCarrinho += c.quantidade * c.produto.valor;
    });
  }

}
