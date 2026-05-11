import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { usuariologueadoGuard } from './usuariologueado-guard';

describe('usuariologueadoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => usuariologueadoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
