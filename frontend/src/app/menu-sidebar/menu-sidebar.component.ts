import { SidebarService } from '../services/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/strorage-service/storage.service';

@Component({
  selector: 'menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrl: './menu-sidebar.component.css',
})
export class MenuSidebarComponent implements OnInit{
  isCollapsed = false;

  isAdmin:boolean;
  isKitchenSupervisor:boolean;
  isCashier:boolean;

  constructor(private sidebarService: SidebarService, private storageService: StorageService) {
    this.sidebarService.collapseStatus$.subscribe((status) => {
      this.isCollapsed = status;
    });
  }
  ngOnInit(): void {
    this.storageService.isAdminLoggedIn$.subscribe((data)=>(this.isAdmin=data));
    this.storageService.isCashierLoggedIn$.subscribe(
      (data) => (this.isCashier=data)
    );
    this.storageService.isKitchenSupervisorLoggedIn$.subscribe(
      (data) => (this.isKitchenSupervisor=data)
    );
  }
}
