import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../auth-data.service';

@Component({
  selector: 'restaurant-nav',
  templateUrl: './restaurant-nav.component.html',
  styleUrls: ['./restaurant-nav.component.css']
})
export class RestaurantNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  currentUser: User | null = null;

  constructor(private breakpointObserver: BreakpointObserver, private angularFireAuth: AngularFireAuth, private db: AngularFirestore) {
    this.angularFireAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
      if (user) {
        this.db.collection('users').doc(user.uid).ref.get().then((doc) => {
          this.currentUser!.roles = doc.get("roles");
          if (this.currentUser!.roles?.length == 0) {
            this.currentUser!.roles = ['brak'];
          }
        });
      }
    });
  }

}
