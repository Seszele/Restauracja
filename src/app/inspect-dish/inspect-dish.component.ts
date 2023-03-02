import { DishInfo, IDish } from './../dish-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishDataService } from '../dish-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DishRatingComponent } from '../dish-rating/dish-rating.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartDataService } from '../cart-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthDataService } from '../auth-data.service';

@Component({
  selector: 'app-inspect-dish',
  templateUrl: './inspect-dish.component.html',
  styleUrls: ['./inspect-dish.component.css']
})
export class InspectDishComponent implements OnInit {
  dish!: IDish;
  dishInfo!: DishInfo;
  photoIndex = 5000;
  sub: any;
  id!: number;
  voted = false;
  myform!: FormGroup;
  inCart = 0;
  reviews: Review[] = [];

  constructor(private route: ActivatedRoute, public authService: AuthDataService, public dishData: DishDataService, public dialog: MatDialog, private formBuilder: FormBuilder, public cartData: CartDataService, private snackBar: MatSnackBar, private db: AngularFirestore) { }
  initialValues: any;
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.dishInfo = this.dishData.byId(this.id);
    this.dish = this.dishInfo.dish;
    this.photoIndex = this.dish.photos.length * 1000;
    this.loadReviews();


    this.myform = this.formBuilder.group({
      nick: ['admin', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      description: ["", [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      date: [null]
    });
    this.initialValues = this.myform.value;

    this.inCart = this.cartData.getDishCount(this.dishInfo.dish);
    this.voted = this.dishInfo.voted;
  }
  onSubmit() {
    if (this.myform.valid) {
      this.snackBar.open("Dodano recenzję!", '', {
        duration: 1500
      })
      var review: Review = this.myform.value as Review;
      this.db.collection("dishes").ref.where("name", "==", this.dish.name).get().then(query => {
        query.forEach(dishIDdoc => {
          review.did = dishIDdoc.id;
          this.db.collection("reviews").add(review);
          this.loadReviews()
          return
        })
      })

    }
  }
  loadReviews() {
    this.reviews = [];
    this.db.collection("dishes").ref.where("name", "==", this.dish.name).get().then(query => {
      query.forEach(dishIDdoc => {
        this.db.collection("reviews").ref.where("did", "==", dishIDdoc.id).get().then(reviews => {
          reviews.forEach(review => {
            this.reviews.push(review.data() as Review);
          })
        })
        return
      })
    })
  }
  openRatingDialog() {
    this.authService.hasPermission(['klient']).then(isOk => {
      if (isOk) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          name: this.dish.name,
          dish: this.dishInfo
        };
        this.dialog.open(DishRatingComponent, dialogConfig).afterClosed().subscribe(() => { this.voted = this.dishInfo.voted })
      }
      else {
        this.snackBar.open('Nie masz uprawnień aby oceniać dania!', '', {
          duration: 2000
        })
      }
    })

  }

  getNextPhoto() {
    this.photoIndex++;
  }
  getPrevPhoto() {
    this.photoIndex--;
  }

  dishPicked(event: string) {
    //
  }
  dishRemoved(event: string) {
    //
  }
  removeFromBasket() {
    this.cartData.remove(this.dishInfo.dish);
    this.inCart--;
    this.dish.quantity++;
  }
  addToBasket() {
    this.cartData.add(this.dishInfo.dish)
    this.dish.quantity--;
    this.inCart++;
  }
  deleteDish() {

  }

}

export interface Review {
  nick: string;
  title: string;
  description: string;
  date: Date;
  did?: string;
}