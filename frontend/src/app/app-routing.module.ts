import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DishesComponent } from './manage-dishes/dishes/dishes.component';
import { DishFormComponent } from './manage-dishes/dish-form/dish-form.component';
import { EditDishFormComponent } from './manage-dishes/edit-dish-form/edit-dish-form.component';
import { OrderedDishesComponent } from './manage-ordered-dishes/ordered-dishes/ordered-dishes.component';
import { UnpaidOrdersComponent } from './cashier-manage/unpaid-orders/unpaid-orders.component';
import { BillDetailComponent } from './cashier-manage/bill-detail/bill-detail.component';
import { PaidOrdersComponent } from './cashier-manage/paid-orders/paid-orders.component';
import { BillDetailPaidOrderComponent } from './cashier-manage/bill-detail-paid-order/bill-detail-paid-order.component';
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from './services/guards/noAuth-guard/no-auth.guard';
import { CashierGuard } from './services/guards/cashier-guard/cashier.guard';
import { KitchenSupervisorGuard } from './services/guards/kitchen-supervisor-guard/kitchen-supervisor.guard';
import { AdminGuard } from './services/guards/admin-guard/admin.guard';
import { AccountComponent } from './account-management/account/account.component';
import { AccountCreateFormComponent } from './account-management/account-create-form/account-create-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,
    canActivate: [NoAuthGuard]
   },
  {
    path: 'manage/account/new',
    component: AccountCreateFormComponent,
    canActivate: [ NoAuthGuard, AdminGuard]
  },
  {
    path: 'manage/account',
    component: AccountComponent,
    canActivate: [NoAuthGuard, AdminGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'manage/paid-orders/order-detail/:id',
    component: BillDetailPaidOrderComponent,
    canActivate: [NoAuthGuard, CashierGuard],
  },
  {
    path: 'manage/paid-orders',
    component: PaidOrdersComponent,
    canActivate: [NoAuthGuard, CashierGuard],
  },
  {
    path: 'manage/unpaid-orders/order-detail/:id',
    component: BillDetailComponent,
    canActivate: [NoAuthGuard, CashierGuard],
  },
  {
    path: 'manage/unpaid-orders',
    component: UnpaidOrdersComponent,
    canActivate: [NoAuthGuard, CashierGuard],
  },
  {
    path: 'manage/ordered-dishes',
    component: OrderedDishesComponent,
    canActivate: [NoAuthGuard, KitchenSupervisorGuard],
  },
  {
    path: 'manage/dishes/new',
    component: DishFormComponent,
    canActivate: [NoAuthGuard, AdminGuard],
  },
  {
    path: 'manage/dishes/:id',
    component: EditDishFormComponent,
    canActivate: [NoAuthGuard, AdminGuard],
  },
  {
    path: 'manage/dishes',
    component: DishesComponent,
    canActivate: [NoAuthGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
