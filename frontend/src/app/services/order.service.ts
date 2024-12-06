import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/api/orders';

  constructor(private httpClient: HttpClient) {}

  getOrdersList(): Observable<Order[]> {
    return this.getOrders(this.baseUrl);
  }

  getOrderById(orderId: number): Observable<Order> {
    const orderUrl = `${this.baseUrl}/${orderId}`;
    return this.httpClient.get<Order>(orderUrl);
  }

  endOrderForPayByCash(order: Order): Observable<any> {
    const body = {
      id: order.id,
      tableNum: order.tableNum,
      orderTrackingNumber: order.orderTrackingNumber,
      totalQuantity: order.totalQuantity,
      totalPrice: order.totalPrice,
      status: 'Payed',
      payByCash: true,
      customerPay: order.customerPay,
      returnMoney: order.returnMoney,
      timeCreated: order.timeCreated,
      lastUpdated: order.lastUpdated,
      orderDone: order.orderDone,
      orderDishes: [],
    };

    const orderUrl = `http://localhost:8080/api/update/doneOrderForPayByCash/${order.id}`;

    return this.httpClient
      .post<any>(orderUrl, body);
  }
  private getOrders(searchUrl: string): Observable<Order[]> {
    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map((response) => response._embedded.orders));
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}

interface GetResponse {
  _embedded: {
    orders: Order[];
  };
}
