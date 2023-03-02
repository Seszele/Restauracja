import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  constructor(private angularFireAuth: AngularFireAuth, private db: AngularFirestore) {
  }
  getCurrentUser() {
    return new Promise<User | null>((resolve) => {
      var user = this.angularFireAuth.onAuthStateChanged((user) => {
        if (user) {
          var currentUser: User = user;
          this.getUserRoles(currentUser).then((roles) => {
            currentUser.roles = roles;
            resolve(currentUser);
          })
        } else {
          resolve(null);
        }
      })
    })
  }
  getUserRoles(user: User) {
    return new Promise<string[]>((resolve) => {
      var roles = this.db.collection('users').doc(user.uid).ref.get().then((doc) => {
        resolve(doc.get("roles"))
      })
    })
  }
  hasPermission(expectedRoles: string[]) {
    return this.getCurrentUser().then(user => {
      if (user) {
        if (expectedRoles.length == 0) {
          return true;
        }
        if (user.roles?.some(r => expectedRoles.includes(r))) {
          return true;
        }
        return false;
      }
      return false;
    })
  }
}
export interface User {
  uid: string;
  email: string | null;
  roles?: string[];
}
