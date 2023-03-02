import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        this.infoCard = { title: 'Dane kontaktowe', cols: 2, rows: 1 };
        return [
          { title: 'Witaj!', content: this.intro2, cols: 2, rows: 1 },
          { title: 'Lokalizacja', content: '', backgroundImage: true, width: 200, cols: 2, rows: 1 }
        ];
      }
      this.infoCard = { title: 'Dane kontaktowe', cols: 1, rows: 1 }
      return [
        { title: 'Witaj!', content: this.intro1, cols: 1, rows: 1 },
        { title: 'Lokalizacja', content: '', backgroundImage: true, width: 500, cols: 1, rows: 2 }
      ];
    })
  );
  infoCard = { title: 'Dane kontaktowe', cols: 1, rows: 1 };
  intro1 = 'Zapraszamy do zakupu w naszej restauracji! Znajdziesz tu dania z każdego zakątku świata w atrakcyjnej cenie. Sprawdź nasze menu!';
  intro2 = 'Zapraszamy do zakupu w naszej restauracji!';
  contactInfo = {
    phone: '111333666',
    email: 'restauracja_online@gmail.com',
    gg: '333999444'
  };

  constructor(private breakpointObserver: BreakpointObserver) { }
}
