import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthDataService } from '../auth-data.service';

@Directive({
  selector: '[disableIfUnauthorized]'
})
export class DisableIfUnauthorizedDirective implements OnInit {
  @Input('disableIfUnauthorized') expectedRoles: string[] = [];
  constructor(private el: ElementRef, public authService: AuthDataService) { }

  ngOnInit() {
    this.authService.hasPermission(this.expectedRoles).then((isOk) => {
      if (!isOk) {
        this.el.nativeElement.disabled = true;
      }
    })
  }
}
