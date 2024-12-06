import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private collapseStatus = new BehaviorSubject<boolean>(false);
  collapseStatus$ = this.collapseStatus.asObservable();

  toggleCollapse() {
    this.collapseStatus.next(!this.collapseStatus.value);
  }
}
