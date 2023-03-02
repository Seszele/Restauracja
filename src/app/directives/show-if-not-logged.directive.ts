import { Directive, ElementRef } from '@angular/core';
import { AuthDataService } from '../auth-data.service';

@Directive({
  selector: '[showIfNotLogged]'
})
export class ShowIfNotLoggedDirective {

  constructor(private el: ElementRef, public authService: AuthDataService) { }
  ngOnInit() {
    this.authService.getCurrentUser().then((user) => {
      if (user) {
        this.el.nativeElement.style.display = 'none';
      }
    })
  }
}
