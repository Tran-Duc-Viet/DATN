import { Router } from '@angular/router';
import { SidebarService } from '../services/sidebar.service';
import { SidebarToggleButtonStatusService } from './../services/sidebar-toggle-button-status.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/strorage-service/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.storageService.isAuthenticated$.subscribe(
      (data) => (this.isAuthenticated = data)
    );
  }

  toggleSidebar() {
    this.sidebarService.toggleCollapse();

  }

  logout() {
    this.storageService.logout();
    this.router.navigateByUrl('/login');
  }
}
