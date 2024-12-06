import { Order } from './../../models/order.model';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderedDishesService } from '../../services/ordered-dishes.service';
import { OrderDish } from '../../models/order-dish.model';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-bill-detail-paid-order',
  templateUrl: './bill-detail-paid-order.component.html',
  styleUrl: './bill-detail-paid-order.component.css',
})
export class BillDetailPaidOrderComponent {
  orderDishes: OrderDish[] = [];
  order: Order;
  user: User;
  groupedOrderDishes: OrderDish[] = [];

  // Variables to track radio button state
  payByCashChecked: boolean = false;
  qrPayChecked: boolean = false;

  returnMoney: number;
  text: string = '';

  isSuccess: boolean = false;

  paymethod: string = '';

  // Default to true as per your HTML

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private orderedDishService: OrderedDishesService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const orderId = +params.get('id');
      this.loadOrderDetail(orderId);
    });
  }

  loadOrderDetail(orderId: number): void {
    this.orderService.getOrderById(orderId).subscribe((order) => {
      this.order = order;
      this.setPayMethod(order);
      if (this.order && this.order._links && this.order._links.orderDishes) {
        this.loadOrderDish(this.order._links.orderDishes.href);
        this.loadUserCreateOrder(this.order._links.user.href);
      }
    });
  }

  loadOrderDish(orderDishUrl: string) {
    this.orderedDishService.getOrderDishes(orderDishUrl).subscribe((data) => {
      this.orderDishes = data;
      this.groupDishesByName(this.orderDishes);
    });
  }

  loadUserCreateOrder(userUrl: string) {
    this.accountService.getUsersOfOrder(userUrl).subscribe((data) => {
      this.user = data;
    });
  }

  groupDishesByName(orderDishes: OrderDish[]): void {
    const grouped = orderDishes.reduce((acc, dish) => {
      const existing = acc.find((item) => item.nameOfDish === dish.nameOfDish);
      if (existing) {
        existing.quantity += dish.quantity;
      } else {
        acc.push({
          nameOfDish: dish.nameOfDish,
          quantity: dish.quantity,
          unitPrice: dish.unitPrice,
          imageUrl: dish.imageUrl,
        });
      }
      return acc;
    }, []);

    this.groupedOrderDishes = grouped;
  }

  calculateTotal(orderDish: OrderDish): string {
    var total = orderDish.quantity * orderDish.unitPrice;
    return total.toString() + ' đ';
  }

  setPayMethod(order: Order) {
    if (order.payByCash == true) {
      this.paymethod = 'Pay By Cash';
    } else {
      this.paymethod = 'Pay By QR Code';
    }
  }
}
