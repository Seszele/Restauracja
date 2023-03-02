import { InspectDishComponent } from './inspect-dish/inspect-dish.component';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { MenuComponent } from './menu/menu.component';
import { AddDishFormComponent } from './add-dish-form/add-dish-form.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  { path: 'home', component: RestaurantComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'add', component: AddDishFormComponent, canActivate: [AuthGuard], data: { expectedRoles: ['menager', 'admin'] } },
  { path: 'cart', component: CartDialogComponent, canActivate: [AuthGuard], data: { expectedRoles: ['klient'] } },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard], data: { expectedRoles: [] } },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard], data: { expectedRoles: ['admin'] } },
  { path: 'menu/dish/:id', component: InspectDishComponent, canActivate: [AuthGuard], data: { expectedRoles: [] } },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: RestaurantComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
