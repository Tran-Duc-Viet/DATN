import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-create-form',
  templateUrl: './account-create-form.component.html',
  styleUrls: ['./account-create-form.component.css'],
})
export class AccountCreateFormComponent {
  hide1 = true;
  hide2 = true;

  signUpForm: FormGroup;
  roles: string[] = [
    'CASHIER',
    'STAFF',
    'KITCHEN_SUPERVISOR'
  ];

  constructor(private accountService: AccountService ,private router:Router) {
    // Initialize loginForm inside constructor after passwordMatchValidator is defined
    this.signUpForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.passwordMatchValidator,
      ]),
      role: new FormControl('', Validators.required),
    });
  }

  get userName() {
    return this.signUpForm.get('userName');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get role(){
    return this.signUpForm.get('role');
  }

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const passwordControl = control.root.get('password'); // Get the password FormControl from the form
    if (passwordControl) {
      const password = passwordControl.value;
      const confirmPassword = control.value;
      return password !== confirmPassword ? { passwordMismatch: true } : null;
    }
    return null;
  };



  submit() {
    if (this.signUpForm.invalid) {
      return;
    }
    const { userName, password , role} = this.signUpForm.value;
    console.log(userName, password, role);
    this.accountService.saveNewUser(userName,password,role).subscribe((response)=>{
      console.log(response);
    })
    this.router.navigate(['/manage/account']);
  }
}
