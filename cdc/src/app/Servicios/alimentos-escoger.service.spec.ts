import { TestBed } from '@angular/core/testing';

import { AlimentosEscogerService } from './alimentos-escoger.service';

describe('AlimentosEscogerService', () => {
  let service: AlimentosEscogerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlimentosEscogerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
