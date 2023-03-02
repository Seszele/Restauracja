import { NgModule, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { AppComponent } from './app.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { DishesComponent } from './dishes/dishes.component';
import { DishComponent } from './dish/dish.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AddDishFormComponent } from './add-dish-form/add-dish-form.component';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { ChipSelectComponent } from './chip-select/chip-select.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { DishRatingComponent } from './dish-rating/dish-rating.component';
import { FilterComponent } from './filter/filter.component';
import { FilterDishPipe } from './filter-dish.pipe';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { RestaurantNavComponent } from './restaurant-nav/restaurant-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { InspectDishComponent } from './inspect-dish/inspect-dish.component';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxPaginationModule } from 'ngx-pagination';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
// import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
//
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HideIfUnauthorizedDirective } from './directives/hide-if-unauthorized.directive';
import { DisableIfUnauthorizedDirective } from './directives/disable-if-unauthorized.directive';
import { ShowIfNotLoggedDirective } from './directives/show-if-not-logged.directive';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    DishesComponent,
    DishComponent,
    AddDishFormComponent,
    ChipSelectComponent,
    StarRatingComponent,
    DishRatingComponent,
    FilterComponent,
    FilterDishPipe,
    CartDialogComponent,
    RestaurantNavComponent,
    MenuComponent,
    InspectDishComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    HideIfUnauthorizedDirective,
    DisableIfUnauthorizedDirective,
    ShowIfNotLoggedDirective,
    AdminPanelComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    NgxSliderModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatNativeDateModule,
    AngularFirestoreModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideFirestore(() => getFirestore()),
    MatListModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    NgxPaginationModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DishRatingComponent]
})
export class AppModule { }
