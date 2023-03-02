import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthDataService, User } from '../auth-data.service';
import { CartDataService } from '../cart-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUser: User | null = null;
  constructor(public authService: AuthDataService, public router: Router, private angularFireAuth: AngularFireAuth, private db: AngularFirestore, public cartData: CartDataService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.getCurrentUser().then((user) => {
      if (user) {
        if (route.data['expectedRoles'].length == 0) {
          return true;
        }
        if (user.roles?.some(r => route.data['expectedRoles'].includes(r))) {
          return true;
        }
        return false;
      }
      else {
        //jesli niepotrzebny login
        this.router.navigate(['home']);
        return false;
      }
    }).catch((err) => {
      console.log('err', err);
      return false;
    });
  }
}
