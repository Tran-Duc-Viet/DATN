
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DishService } from './services/dish.service';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarService } from './services/sidebar.service';
import { DishesComponent } from './manage-dishes/dishes/dishes.component';
import { HomeComponent } from './home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MdComponentsModule } from './md-components/md-components.module';
import { DishFormComponent } from './manage-dishes/dish-form/dish-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDishFormComponent } from './manage-dishes/edit-dish-form/edit-dish-form.component';
import { OrderedDishesComponent } from './manage-ordered-dishes/ordered-dishes/ordered-dishes.component';
import { OrderedDishesService } from './services/ordered-dishes.service';
import { UnpaidOrdersComponent } from './cashier-manage/unpaid-orders/unpaid-orders.component';
import { PaidOrdersComponent } from './cashier-manage/paid-orders/paid-orders.component';
import { OrderService } from './services/order.service';
import { BillDetailComponent } from './cashier-manage/bill-detail/bill-detail.component';
import { BillDetailPaidOrderComponent } from './cashier-manage/bill-detail-paid-order/bill-detail-paid-order.component';
import { LoginComponent } from './login/login.component';
import { AuthentiactionService } from './services/authentiaction.service';
import { StorageService } from './services/strorage-service/storage.service';
import {AccountComponent } from './account-management/account/account.component';
import { AccountService } from './services/account.service';
import { AccountCreateFormComponent } from './account-management/account-create-form/account-create-form.component';
import { BankAccountService } from './services/bank-account.service';



@NgModule({
  declarations: [
    AppComponent,
    MenuSidebarComponent,
    NavbarComponent,
    DishesComponent,
    HomeComponent,
    DishFormComponent,
    EditDishFormComponent,
    OrderedDishesComponent,
    UnpaidOrdersComponent,
    PaidOrdersComponent,
    BillDetailComponent,
    BillDetailPaidOrderComponent,
    LoginComponent,
    AccountComponent,
    AccountCreateFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MdComponentsModule,
  ],
  providers: [
    DishService,
    SidebarService,
    OrderedDishesService,
    OrderService,
    BankAccountService,
    AuthentiactionService,
    StorageService,
    AccountService,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
