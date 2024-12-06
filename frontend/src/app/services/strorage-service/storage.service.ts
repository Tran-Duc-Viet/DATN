import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const USER = 'c_user';
const TOKEN = 'c_token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private adminLoggedInSource = new BehaviorSubject<boolean>(false);
  isAdminLoggedIn$ = this.adminLoggedInSource.asObservable();

  private staffLoggedInSource = new BehaviorSubject<boolean>(false);
  isStaffLoggedIn$ = this.staffLoggedInSource.asObservable();

  private kitchenSupervisorLoggedInSource = new BehaviorSubject<boolean>(false);
  isKitchenSupervisorLoggedIn$ =
    this.kitchenSupervisorLoggedInSource.asObservable();

  private cashierLoggedInSource = new BehaviorSubject<boolean>(false);
  isCashierLoggedIn$ = this.cashierLoggedInSource.asObservable();

  private authenticatedSource = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.authenticatedSource.asObservable();

  constructor() {}

  public saveUser(user: any) {
    window.localStorage.removeItem(USER);
    if (user.active == true) {
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  public saveToken(bearerToken: string, user: any) {
    window.localStorage.removeItem(TOKEN);
    if (user.active == true) {
      window.localStorage.setItem(TOKEN, bearerToken);
    }
    }


  public getToken(): string {
    return window.localStorage.getItem(TOKEN);
  }

  public getUser(): any {
    return JSON.parse(window.localStorage.getItem(USER));
  }

  private getUserRole(): string {
    const user = this.getUser();
    if (user == null) {
      return '';
    }
    return user.role;
  }
  private getUserActive(): boolean {
    const user = this.getUser();
    if (user == null) {
      return false;
    }
    return user.active;
  }

  public hasToken(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    return true;
  }
  public isUserActive() {
    if (this.getToken() == null) {
      return false;
    }
    return this.getUserActive() === true;
  }

  public isAdminLogIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'ADMIN';
  }

  public isStaffLogin(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'STAFF';
  }

  public isKitchenSuperVisorLogin(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'KITCHEN_SUPERVISOR';
  }

  public isCashierLogin(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'CASHIER';
  }

  public changeData() {
    const isAdmin = this.isAdminLogIn();
    const isStaff = this.isStaffLogin();
    const isKitchenSupervisor = this.isKitchenSuperVisorLogin();
    const isCashier = this.isCashierLogin();
    const isAuthenticated =
      isAdmin || isStaff || isKitchenSupervisor || isCashier;

    this.adminLoggedInSource.next(isAdmin);
    this.staffLoggedInSource.next(isStaff);
    this.kitchenSupervisorLoggedInSource.next(isKitchenSupervisor);
    this.cashierLoggedInSource.next(isCashier);
    this.authenticatedSource.next(isAuthenticated);
  }

  public logout() {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
    this.changeData();
  }
}
