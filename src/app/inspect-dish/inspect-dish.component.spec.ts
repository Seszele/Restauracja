import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectDishComponent } from './inspect-dish.component';

describe('InspectDishComponent', () => {
  let component: InspectDishComponent;
  let fixture: ComponentFixture<InspectDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectDishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
