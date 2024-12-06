import { TestBed } from '@angular/core/testing';

import { OrderedDishesService } from './ordered-dishes.service';

describe('OrderedDishesService', () => {
  let service: OrderedDishesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderedDishesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
