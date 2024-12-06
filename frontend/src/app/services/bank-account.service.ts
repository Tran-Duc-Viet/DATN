import { BankAccount } from './../models/bank-account.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankData } from '../models/bank-data.model';
import { ResponseQrLink } from '../models/rersponse-qr-link.model';
import { ResponseCheckTransaction } from '../models/response-check-transaction.model';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  private baseUrl = 'http://localhost:8080/api/bankAccounts';

  constructor(private httpClient: HttpClient) {}


  getQr(totalPrice: number): Observable<ResponseQrLink> {
    const body={
      totalMoney: totalPrice
    }
    return this.httpClient.post<ResponseQrLink>("http://localhost:8080/api/get/getQr", body);
  }

  checkQr(totalPrice: number, id: number): Observable<ResponseCheckTransaction>{
    const body = {
      totalMoney: totalPrice,
    };
    const url = `http://localhost:8080/api/update/checkQR/${id}`;
    return this.httpClient.post<ResponseCheckTransaction>(
      url,
      body
    );
  }
}
