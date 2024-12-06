import { StorageService } from './services/strorage-service/storage.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'datn-frontend';

  isAuthenticated: boolean;

  constructor(private router: Router, private storageService: StorageService) {

  }


  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.storageService.changeData();
      }
    });
    this.storageService.isAuthenticated$.subscribe(
      (data) => (this.isAuthenticated = data)
    );
  }


}
