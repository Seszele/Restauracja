import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  page: number = 1;
  itemsPerPage: number = 3;
  itemsPerPageSelected: string = '3';
  constructor() { }

  ngOnInit(): void {
  }
  changePagination(page: number) {
    this.page = page;
  }
  changeItemsPerPageSelection() {
    this.itemsPerPage = parseInt(this.itemsPerPageSelected);
  }
}
