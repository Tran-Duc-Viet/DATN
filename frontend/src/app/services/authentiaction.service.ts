import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable, from, map, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { StorageService } from './strorage-service/storage.service';

const BASE_URL = ['http://localhost:8080'];
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root',
})
export class AuthentiactionService {
  // register(email: string, username: string, password: string){
  //   const promise=this.
  // }

  constructor(private http: HttpClient, private storage:StorageService) {}

  login(userName: string, password: string): Observable<any> {
    const body = {
      userName: userName,
      password: password,
    };
    return this.http
      .post(BASE_URL + '/login', body, { observe: 'response' })
      .pipe(
        tap((__) => this.log('User Authentication')),
        map((res: HttpResponse<any>) => {
          this.storage.saveUser(res.body);
          const tokenLength=res.headers.get(AUTH_HEADER).length;
          const bearerToken=res.headers.get(AUTH_HEADER).substring(7,tokenLength);
          this.storage.saveToken(bearerToken,res.body);
          this.storage.changeData();

          return res;
        })
      );
  }
  log(message: string): void {
    console.log(message);
  }
}
