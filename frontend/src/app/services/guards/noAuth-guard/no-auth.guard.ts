import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../strorage-service/storage.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private storageService: StorageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.storageService.hasToken()) {
      this.storageService.logout();
      this.router.navigate(['/login']);
      alert('You are not loggedIn');
      return false;
    }

    return true;
  }
}
