import { Injectable } from '@angular/core';
import DishesJ from '../assets/dishes/dishes.json';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom, lastValueFrom } from 'rxjs';

export interface IDish {
  id: number;
  name: string;
  cuisine: string;
  categories: string[];
  ingredients: string[];
  quantity: number;
  price: number;
  photos: string[];
  description: string;
}
export enum Pricing {
  Low,
  Normal,
  High,
}
export class DishInfo {
  dish: IDish;
  pricing = Pricing.Normal;
  voted = false;
  deleted = false;
  private _ratings = 0;
  numOfRatings = 0;
  inCart = 0;

  constructor(dish: IDish) {
    this.dish = dish;
  }
  setPricing(pricing: Pricing) {
    this.pricing = pricing;
  }

  public get ratings(): number {
    return this._ratings;
  }

  public addRating(v: number): void {
    this._ratings += v;
    this.numOfRatings++;
  }

  public getRating() {
    if (this.numOfRatings === 0)
      return 0;
    return this.ratings / this.numOfRatings;
  }
}
function setupDishes(dishes: IDish[], numOfExpensive: number, numOfCheap: number): DishInfo[] {
  let dishInfo = new Array();
  for (const dish of dishes) {
    dishInfo.push(new DishInfo(dish));
  }


  let highPriceArr = [...dishInfo].sort((a, b) => b.dish.price - a.dish.price).slice(0, numOfExpensive);
  for (const dish of highPriceArr) {
    dish.pricing = Pricing.High;
  }
  let lowPriceArr = [...dishInfo].sort((a, b) => a.dish.price - b.dish.price).slice(0, numOfCheap);
  for (const dish of lowPriceArr) {
    dish.pricing = Pricing.Low;
  }
  for (let i = 0; i < 7; i++) {
    dishInfo[3].addRating(4);
    dishInfo[0].addRating(4);
    dishInfo[1].addRating(3);
    dishInfo[2].addRating(2);
    dishInfo[4].addRating(5);
    dishInfo[5].addRating(3);
    dishInfo[6].addRating(5);
    dishInfo[7].addRating(3);
    dishInfo[8].addRating(4);
  }
  for (let i = 0; i < 3; i++) {
    dishInfo[3].addRating(4);
    dishInfo[0].addRating(2);
    dishInfo[1].addRating(5);
    dishInfo[2].addRating(3);
    dishInfo[4].addRating(4);
    dishInfo[5].addRating(2);
    dishInfo[6].addRating(1);
    dishInfo[7].addRating(5);
    dishInfo[8].addRating(5);
  }
  return dishInfo;
}
function updatePricing(dishes: DishInfo[], numOfExpensive = 2, numOfCheap = 2) {
  for (const dish of dishes) {
    dish.pricing = Pricing.Normal;
  }
  let highPriceArr = [...dishes].sort((a, b) => b.dish.price - a.dish.price).slice(0, numOfExpensive);
  for (const dish of highPriceArr) {
    dish.pricing = Pricing.High;
  }
  let lowPriceArr = [...dishes].sort((a, b) => a.dish.price - b.dish.price).slice(0, numOfCheap);
  for (const dish of lowPriceArr) {
    dish.pricing = Pricing.Low;
  }
}


@Injectable({
  providedIn: 'root'
})
export class DishDataService {
  dishesJ: IDish[] = DishesJ;
  dishes = setupDishes(this.dishesJ, 2, 2);
  constructor(private db: AngularFirestore) {
  }
  get() {
    return this.dishes;
  }
  add(dish: IDish) {
    this.dishes.push(new DishInfo(dish));
    updatePricing(this.dishes);
  }
  categories() {//probably should be saved in a variable
    let s = new Set<string>();
    for (const dish of this.dishes) {
      for (const category of dish.dish.categories) {
        s.add(category);
      }
    }
    return Array.from(s.values());
  }
  cuisine() {//probably should be saved in a variable
    let s = new Set<string>();
    for (const dish of this.dishes) {
      s.add(dish.dish.cuisine);
    }
    return Array.from(s.values());
  }
  ingredients() {//probably should be saved in a variable
    let s = new Set<string>();
    for (const dish of this.dishes) {
      for (const ingredient of dish.dish.ingredients) {
        s.add(ingredient);
      }
    }
    return Array.from(s.values());
  }
  maxPrice() {
    return Math.max.apply(Math, this.dishes.map(function (o) { return o.dish.price; }))
  }
  minPrice() {
    return Math.min.apply(Math, this.dishes.map(function (o) { return o.dish.price; }))
  }
  maxRating() {
    return Math.max.apply(Math, this.dishes.map(function (o) { return o.getRating(); }))
  }
  minRating() {
    return Math.min.apply(Math, this.dishes.map(function (o) { return o.getRating(); }))
  }

  byId(id: number) {
    for (const dish of this.dishes) {
      if (dish.dish.id == id) {
        return dish;
      }
    }
    return this.dishes[5];
  }

  dbAdd(dish: IDish): Promise<any> {
    return new Promise<any>((res, reject) => {
      this.db.collection('/dishes').add({ id: dish.id, name: dish.name, cuisine: dish.cuisine, categories: dish.categories, ingredients: dish.ingredients, quantity: dish.quantity, price: dish.price, photos: dish.photos, description: dish.description })
        .then(res => { }, err => reject(err));
    });
  }

  dbUpdate(dish: IDish) {
    return this.db.collection('/dishes').doc(dish.id.toString()).update(dish);

  }

  dbDelete(dish: IDish) {
    return this.db.collection('/dishes').doc(dish.id.toString()).delete();

  }

  //needs to be subscribed manualy
  dbGetDishesObservable() {
    return this.db.collection('/dishes').snapshotChanges();

  }

}