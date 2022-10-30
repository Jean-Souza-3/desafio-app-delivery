import { TestBed } from '@angular/core/testing';

import { ProdutoEscolhidoService } from './produto-escolhido.service';

describe('ProdutoEscolhidoService', () => {
  let service: ProdutoEscolhidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoEscolhidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
