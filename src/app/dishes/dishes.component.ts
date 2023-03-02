import { FilterDataService } from './../filter-data.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DishDataService, DishInfo } from '../dish-data.service';


@Component({
  selector: 'dish-list',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes?: DishInfo[];
  total = 0;
  tmp = [];
  @Output() changedTotal = new EventEmitter<number>();
  @Input() page: number = 1;
  @Input() itemsPerPage: number = 4;


  constructor(public dishData: DishDataService, public filterData: FilterDataService) {

  }

  dishPicked(event: string) {
    this.total++;
    this.changedTotal.emit(this.total)
  }
  dishRemoved(event: string) {
    this.total--;
    this.changedTotal.emit(this.total)
  }
  loaded = false;
  ngOnInit(): void {
    this.dishes = this.dishData.get();
    this.loaded = true
  }
  getDishList() {
    this.dishData.dbGetDishesObservable().subscribe(res => {
      this.tmp = [];
      for (const dish of res) {
        // @ts-ignore
        this.tmp.push({ id: dish.payload.doc.data().id, name: dish.payload.doc.data().name, cuisine: dish.payload.doc.data().cuisine, categories: dish.payload.doc.data().categories, ingredients: dish.payload.doc.data().ingredients, quantity: dish.payload.doc.data().quantity, price: dish.payload.doc.data().price, photos: dish.payload.doc.data().photos, description: dish.payload.doc.data().description })
      }
    });
  }
}
