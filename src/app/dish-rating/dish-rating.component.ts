import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'dish-rating',
  templateUrl: './dish-rating.component.html',
  styleUrls: ['./dish-rating.component.css']
})
export class DishRatingComponent implements OnInit {
  currentRating = 3;
  public snackBarDuration: number = 2000;
  constructor(private dialogRef: MatDialogRef<DishRatingComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
  }

  changeCurrentRating(rating: number) {
    this.currentRating = rating;
  }
  updateRating() {
    this.snackBar.open('Oceniono ' + this.currentRating + ' / ' + 5, '', {
      duration: this.snackBarDuration
    });
    this.data.dish.addRating(this.currentRating);
    this.data.dish.voted = true;
  }
}
