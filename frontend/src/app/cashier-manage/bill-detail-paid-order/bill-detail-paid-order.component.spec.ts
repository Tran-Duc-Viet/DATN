import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDetailPaidOrderComponent } from './bill-detail-paid-order.component';

describe('BillDetailPaidOrderComponent', () => {
  let component: BillDetailPaidOrderComponent;
  let fixture: ComponentFixture<BillDetailPaidOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillDetailPaidOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillDetailPaidOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
