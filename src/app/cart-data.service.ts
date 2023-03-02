import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthDataService } from './auth-data.service';
import { DishInfo, DishDataService, IDish } from './dish-data.service';

let cartDish: [DishInfo, number];

//data service dodaje do bazy tylko i usuwa
@Injectable({
  providedIn: 'root'
})
export class CartDataService {
  dishes: [IDish, number][] = [];
  constructor(private db: AngularFirestore, public authService: AuthDataService, private snackBar: MatSnackBar) {
  }

  add(dish: IDish) {
    this.snackBar.open("Dodano " + dish.name + " do koszyka!", '', {
      duration: 1500
    });
    if (this.dishes.some(d => d[0] === dish)) {
      this.dishes.find(d => d[0] === dish)![1]++;
    }
    else {
      this.dishes.push([dish, 1]);
    }
    this.authService.getCurrentUser().then(user => {
      if (user) {
        this.db.collection('users').doc(user.uid).ref.get().then(doc => {
          var newArr = doc.get("cart");
          this.db.collection("dishes").ref.where("name", "==", dish.name).get().then(query => {
            query.forEach(dishIDdoc => {
              newArr.push(dishIDdoc.id);
              this.db.collection('users').doc(user.uid).update({ 'cart': newArr })
              return
            })
          })
        })
      }
    })
  }
  remove(dish: IDish) {
    this.snackBar.open("Usunięto " + dish.name + " z koszyka!", '', {
      duration: 1500
    });
    if (this.dishes.some(d => d[0] === dish)) {
      this.dishes.find(d => d[0] === dish)![1]--;
      if (this.dishes.find(d => d[0] === dish)![1] == 0)
        this.dishes.splice(this.dishes.findIndex(d => d[0] === dish), 1);
    }
    this.authService.getCurrentUser().then(user => {
      if (user) {
        this.db.collection('users').doc(user.uid).ref.get().then(doc => {
          var newArr = doc.get("cart");
          this.db.collection("dishes").ref.where("name", "==", dish.name).get().then(query => {
            query.forEach(dishIDdoc => {
              const index = newArr.indexOf(dishIDdoc.id);
              if (index > -1) {
                newArr.splice(index, 1);
              }
              this.db.collection('users').doc(user.uid).update({ 'cart': newArr })
              return
            })
          })
        })
      }
    })
  }
  get() {
    return this.dishes;
  }
  getDishCount(dish: IDish) {
    for (var i = 0; i < this.dishes.length; i++) {
      if (this.dishes[i][0].name == dish.name) {
        return this.dishes[i][1]
      }
    }
    return 0;
  }

}
