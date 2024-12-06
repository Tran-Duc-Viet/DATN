import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = 'http://localhost:8080/api/users';


  constructor(private httpClient: HttpClient) {}

  getUsersList(): Observable<User[]> {
    return this.getUsers(this.baseUrl);
  }

  searchUsers(theKeyWord: string): Observable<User[]> {
    const searchUrl = `${this.baseUrl}/search/findByUserNameContaining?name=${theKeyWord}`;
    return this.getUsers(searchUrl);
  }

  getUsersOfOrder(url:string):Observable<User>{
    return this.httpClient.get<User>(url);
  }

  saveNewUser(
    userName: string,
    userPassword: string,
    role: string
  ): Observable<any> {
    const body = {
      userName: userName,
      userPassword: userPassword,
      role: role,
      isActive: true
    };
    return this.httpClient.post<any>('http://localhost:8080/signUp', body);
  }

  updateUserRole(user: User): Observable<User> {
    const updateUrl = `${this.baseUrl}/${user.id}`;
    return this.httpClient.put<User>(updateUrl, user);
  }

  deleteUser(user:User): Observable<any> {
    // need to build URL based on product id
    const userUrl = `${this.baseUrl}/${user.id}`;
    return this.httpClient.put<User>(userUrl, user);
  }

  // getUser(theDishId: number): Observable<User> {
  //   // need to build URL based on product id
  //   const dishUrl = `${this.baseUrl}/${theDishId}`;

  //   return this.httpClient.get<User>(dishUrl);
  // }

  // deleteUser(theDishId: number): Observable<any> {
  //   // need to build URL based on product id
  //   const dishUrl = `${this.baseUrl}/${theDishId}`;
  //   return this.httpClient.delete(dishUrl);
  // }

  private getUsers(searchUrl: string): Observable<User[]> {
    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map((response) => response._embedded.users));
  }
}

interface GetResponse {
  _embedded: {
    users: User[];
  };
}
