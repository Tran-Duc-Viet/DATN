import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedDishesComponent } from './ordered-dishes.component';

describe('OrderedDishesComponent', () => {
  let component: OrderedDishesComponent;
  let fixture: ComponentFixture<OrderedDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderedDishesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderedDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
