import { DishInfo, IDish } from './../dish-data.service';
import { CartDataService } from './../cart-data.service';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthDataService } from '../auth-data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent implements OnInit {
  dishes: [IDish, number][] = [];
  constructor(public cartData: CartDataService, private db: AngularFirestore, public authService: AuthDataService) {
    this.authService.getCurrentUser().then((user) => {
      if (user) {
        this.db.collection('users').doc(user.uid).ref.get().then(doc => {
          doc.get("cart").forEach((id: string) => {
            this.db.collection('dishes').doc(id).ref.get().then(dishDoc => {
              var dish: IDish;
              dish = dishDoc.data() as IDish
              if (this.dishes.some(d => d[0].name === dish.name)) {
                this.dishes.find(d => d[0].name === dish.name)![1]++;
              }
              else {
                this.dishes.push([dish, 1]);
              }
            })
          });
        })
      }
    })
  }

  ngOnInit(): void {
  }

  dishNumber(dish: any) {
    return dish[1];
  }
  dishName(dish: any) {
    return dish[0].name;
  }
  dishPrice(dish: any) {
    return dish[0].price;
  }
  sumDishes() {
    let sum = 0;
    for (const dish of this.dishes) {
      sum += dish[1];
    }
    return sum;
  }
  total() {
    let sum = 0;
    for (const dish of this.dishes) {
      sum += dish[1] * dish[0].price;
    }
    return sum;
  }
}
