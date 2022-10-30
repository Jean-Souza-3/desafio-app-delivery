import { Injectable } from '@angular/core';
import { Produto } from '../produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoEscolhidoService {
  produto: Produto;
  constructor() { }
}
