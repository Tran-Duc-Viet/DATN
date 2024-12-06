import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidOrdersComponent } from './unpaid-orders.component';

describe('UnpaidOrdersComponent', () => {
  let component: UnpaidOrdersComponent;
  let fixture: ComponentFixture<UnpaidOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnpaidOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnpaidOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
