import { TestBed } from '@angular/core/testing';

import { AuthentiactionService } from './authentiaction.service';

describe('AuthentiactionService', () => {
  let service: AuthentiactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentiactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
