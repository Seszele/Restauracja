import { TestBed } from '@angular/core/testing';

import { DishDataService } from './dish-data.service';

describe('DishDataService', () => {
  let service: DishDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
