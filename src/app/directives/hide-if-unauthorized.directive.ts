import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthDataService } from '../auth-data.service';

@Directive({
  selector: '[hideIfUnauthorized]'
})
export class HideIfUnauthorizedDirective implements OnInit {
  @Input('hideIfUnauthorized') expectedRoles: string[] = [];
  constructor(private el: ElementRef, public authService: AuthDataService) { }

  ngOnInit() {
    this.authService.hasPermission(this.expectedRoles).then((isOk) => {
      if (!isOk) {
        this.el.nativeElement.style.display = 'none';
      }
    })
  }
}
