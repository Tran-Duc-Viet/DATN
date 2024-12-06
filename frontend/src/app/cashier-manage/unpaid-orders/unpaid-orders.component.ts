import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-unpaid-orders',
  templateUrl: './unpaid-orders.component.html',
  styleUrl: './unpaid-orders.component.css',
})
export class UnpaidOrdersComponent {
  orders: Order[] = [];
  constructor(private orderSercvice: OrderService) {}

  ngOnInit() {
    this.listOrders();
  }

  listOrders() {
    this.orderSercvice.getOrdersList().subscribe((data) => {
      this.orders = data.filter((order) => order.status === 'Paying');
    });
  }
}
