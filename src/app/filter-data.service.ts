import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {
  minPrice : number = 0;
  maxPrice : number = 10000;
  minRating : number = 0;
  maxRating : number = 5;
  categories : string[] = [];
  cuisine: string[] = [];
  reset(){
    this.minPrice  = 0;
    this.maxPrice  = 10000;
    this.minRating  = 0;
    this.maxRating  = 5;
    this.categories = [];
    this.cuisine = []
  }
  constructor() { }
}
