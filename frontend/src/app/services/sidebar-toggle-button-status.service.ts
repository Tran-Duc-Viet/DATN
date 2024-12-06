import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarToggleButtonStatusService {
  private statusSource = new BehaviorSubject<boolean>(false);
  currentStatus = this.statusSource.asObservable();

  changeStatus() {
    this.statusSource.next(!this.currentStatus);
  }
}
