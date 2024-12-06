import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentiactionService } from '../services/authentiaction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../services/strorage-service/storage.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent{
  hide = true;

  constructor(
    private autheticationService: AuthentiactionService,
    private router: Router,
    private storageService: StorageService,


  ) {}


  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    const { userName, password } = this.loginForm.value;
    this.autheticationService.login(userName,password).subscribe((response)=>{
      console.log(response);
      if(this.storageService.isAdminLogIn()||this.storageService.isStaffLogin()||this.storageService.isCashierLogin()||this.storageService.isKitchenSuperVisorLogin()){
        if(this.storageService.isUserActive()){
          this.router.navigate(['']);
        }else{
          alert('User is not active');
        }
      }

    }),error=>{
      if(error.status==406){
        alert("User is not active");

      }else{
        alert("Bad credentials");

      }

    };
    ;


  }
  isAdminLogIn() {
    throw new Error('Method not implemented.');
  }
}
