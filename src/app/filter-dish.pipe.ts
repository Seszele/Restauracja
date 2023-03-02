import { Pipe, PipeTransform } from '@angular/core';
import { DishInfo } from './dish-data.service';

@Pipe({
  name: 'filterDish',
  pure: false
})
export class FilterDishPipe implements PipeTransform {

  transform(items: DishInfo[] | undefined, minPrice :number =0,maxPrice:number = Number.MAX_SAFE_INTEGER,minRating :number =0,maxRating:number = Number.MAX_SAFE_INTEGER,
    categories : string[] = [],cuisine : string[] =[]): any {
    items = items?.filter(d => d.dish.price>=minPrice && d.dish.price<=maxPrice);
    items = items?.filter(d=>d.getRating()>=minRating && d.getRating()<=maxRating);
    for (const category of categories) {
      items = items?.filter(d=>d.dish.categories.indexOf(category) > -1);
    }
    if(cuisine.length !== 0)
    {
      let tmp : DishInfo[] | undefined = [];
      let result : DishInfo[] | undefined = [];

      for (const c of cuisine) {        
        tmp = tmp.concat(items!.filter(d=>d.dish.cuisine.indexOf(c) > -1));
      }
      items = tmp;      
    }
    return items;
  }

}
