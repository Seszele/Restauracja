import { Component, OnInit, ViewChild } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { DishDataService } from '../dish-data.service';
import { FilterDataService } from '../filter-data.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  priceSliderOptions: Options = {
    floor: this.dishData.minPrice(),
    ceil: this.dishData.maxPrice()
  };
  ratingSliderOptions: Options = {
    floor: 0,
    ceil: 5
  };
  constructor(public dishData: DishDataService, public filterData : FilterDataService) { }

  ngOnInit(): void {
  }
  
  changeFilteredCategories(categories:string[]){    
    this.filterData.categories = categories;
  }
  changeFilteredCuisine(cuisine:string[]){
    this.filterData.cuisine = cuisine;
  }
  resetFilter(){
    this.filterData.reset();
  }

}
