import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { kitchenSupervisorGuard } from './kitchen-supervisor.guard';

describe('kitchenSupervisorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => kitchenSupervisorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
