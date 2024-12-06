import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDishInfor } from '../models/order-dish-infor.model';
import { Observable, map } from 'rxjs';
import { OrderDish } from '../models/order-dish.model';

@Injectable({
  providedIn: 'root',
})
export class OrderedDishesService {
  private baseUrl = 'http://localhost:8080/api/get/getAllOrderDishInfor';

  constructor(private httpClient: HttpClient) {}

  getOrderedDishesList(): Observable<OrderDishInfor[]> {
    return this.httpClient.get<OrderDishInfor[]>(this.baseUrl);
  }

  updateOrderDish(orderDish: OrderDishInfor, status: string): Observable<any> {
    const dishUrl = `http://localhost:8080/api/orderDishes/${orderDish.id}`;
    console.log('Updating dish:', dishUrl);

    // Prepare the body with the updated fields
    const body = {
      id: orderDish.id,
      nameOfDish: orderDish.nameOfDish,
      imageUrl: orderDish.imageUrl,
      quantity: orderDish.quantity,
      unitPrice: orderDish.unitPrice,
      dishId: orderDish.dishId,
      status: status, // Update the status here
      notice: orderDish.notice,
      timeOrder: orderDish.timeOrder,
      lastUpdated: orderDish.lastUpdated,
    };

    console.log('Updating dish with body:', body);

    return this.httpClient.put<any>(dishUrl, body);
  }



  getOrderDishes(searchUrl: string): Observable<OrderDish[]> {
    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map((response) => response._embedded.orderDishes));
  }
}

interface GetResponse {
  _embedded: {
    orderDishes: OrderDish[];
  };
}

