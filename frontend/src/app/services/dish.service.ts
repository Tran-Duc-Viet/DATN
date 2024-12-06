import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Dish } from '../models/dish.model';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private baseUrl = 'http://localhost:8080/api/dishes';

  constructor(private httpClient: HttpClient) {}

  getDishesList(): Observable<Dish[]> {
    return this.getDishes(this.baseUrl);
  }

  searchDishes(theKeyWord: string): Observable<Dish[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`;
    return this.getDishes(searchUrl);
  }

  updateDish(dish: Dish, theDishId: number): Observable<any> {
    const dishUrl = `${this.baseUrl}/${theDishId}`;
    return this.httpClient.put<Dish>(dishUrl, dish);
  }

  saveNewDishes(dish: Dish): Observable<Dish> {
    return this.httpClient.post<Dish>(this.baseUrl, dish);
  }

  getDish(theDishId: number): Observable<Dish> {
    // need to build URL based on product id
    const dishUrl = `${this.baseUrl}/${theDishId}`;

    return this.httpClient.get<Dish>(dishUrl);
  }

  deleteDish(theDishId: number): Observable<any> {
    // need to build URL based on product id
    const dishUrl = `${this.baseUrl}/${theDishId}`;
    return this.httpClient.delete(dishUrl);
  }

  private getDishes(searchUrl: string): Observable<Dish[]> {
    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map((response) => response._embedded.dishes));
  }
}

interface GetResponse {
  _embedded: {
    dishes: Dish[];
  };
}


