import { Component, Input, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { DishDataService, Pricing, DishInfo, IDish } from '../dish-data.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DishRatingComponent } from '../dish-rating/dish-rating.component';
import { CartDataService } from '../cart-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthDataService } from '../auth-data.service';

function addAlpha(color: string, opacity: number): string {
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}

@Component({
  selector: 'dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  @Input() dishInfo!: DishInfo;
  dish!: IDish;
  @Input() pricingType: Pricing = Pricing.Normal;
  @Output() dishPicked = new EventEmitter<string>(); //tu mozna wyslac np dish jako event argument
  @Output() dishRemoved = new EventEmitter<string>(); //tu mozna wyslac np dish jako event argument
  @Output() dishDeleted = new EventEmitter<DishInfo>(); //tu mozna wyslac np dish jako event argument

  inCart: number = 0;
  lowPriceColour = "CC0000";
  highPriceColour = "8FCE00";
  shadowColour = "#" + addAlpha("000002", 0.527);
  constructor(public dialog: MatDialog, private cartData: CartDataService, public snackBar: MatSnackBar, public authService: AuthDataService) {
  }

  addToBasket() {
    this.cartData.add(this.dishInfo.dish)
    this.dishPicked.emit();
    this.dish.quantity--;
    this.inCart++;
  }
  removeFromBasket() {
    this.cartData.remove(this.dishInfo.dish);
    this.dishRemoved.emit();
    this.inCart--;
    this.dish.quantity++;
  }
  deleteDish() {
    this.snackBar.open('Usunięto ' + this.dishInfo.dish.name, '', {
      duration: 2000
    });
    // this.cartData.removeAll(this.dishInfo.dish);
    this.dishDeleted.emit(this.dishInfo)
    this.dishInfo.deleted = true;
  }
  openRatingDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      name: this.dish.name,
      dish: this.dishInfo
    };
    this.dialog.open(DishRatingComponent, dialogConfig)
  }

  ngOnInit(): void {
    this.dish = this.dishInfo.dish;
    //pobierz ile sztuk jest w koszyku
    this.inCart = this.cartData.getDishCount(this.dishInfo.dish);

    switch (this.pricingType) {
      case Pricing.Low:
        this.shadowColour = "#" + addAlpha(this.lowPriceColour, 0.527);
        break;
      case Pricing.High:
        this.shadowColour = "#" + addAlpha(this.highPriceColour, 0.527);
        break;

      default:
        break;
    }
  }

  hasPermissions(expectedRoles: string[]) {
    this.authService.hasPermission(expectedRoles).then(isOk => {
      return isOk;
    })
  }

}
