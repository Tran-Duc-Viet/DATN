import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-paid-orders',
  templateUrl: './paid-orders.component.html',
  styleUrls: ['./paid-orders.component.css'],
})
export class PaidOrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.listOrders();
  }

  listOrders() {
    this.orderService.getOrdersList().subscribe((data) => {
      this.orders = data.filter((order) => order.status === 'Payed');
      this.filteredOrders = this.orders; // Initially, display all orders
    });
  }

  filter(dateInput: string) {
    const date = this.parseDateString(dateInput);

    if (!date) {
      // If date is invalid, reset filteredOrders to all orders
      this.filteredOrders = this.orders;
      return;
    }

    this.filteredOrders = this.orders.filter((order) => {
      const orderDate = this.parseDateString(order.timeCreated);
      if (!orderDate) {
        return false; // Skip orders with invalid timeCreated dates
      }
      return (
        orderDate.getDate() === date.getDate() &&
        orderDate.getMonth() === date.getMonth() &&
        orderDate.getFullYear() === date.getFullYear()
      );
    });
  }

  private parseDateString(dateString: string): Date | null {
    if (!dateString || dateString.trim().length !== 10) {
      return null; // Invalid date string
    }

    const parts = dateString.split('/');
    if (parts.length !== 3) {
      return null; // Invalid format
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-based
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return null; // Invalid numeric values
    }

    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) {
      return null; // Invalid date
    }

    return date;
  }
}
