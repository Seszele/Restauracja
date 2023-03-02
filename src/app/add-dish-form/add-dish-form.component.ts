import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { IDish, DishDataService, DishInfo } from '../dish-data.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl
} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'add-dish-form',
  templateUrl: './add-dish-form.component.html',
  styleUrls: ['./add-dish-form.component.css']
})
export class AddDishFormComponent implements OnInit {
  myform!: FormGroup;

  constructor(private formBuilder: FormBuilder, public dishData: DishDataService, private snackBar: MatSnackBar) {
  }

  name: AbstractControl = new FormControl();
  initialValues: any;
  ngOnInit(): void {
    this.myform = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      cuisine: ['', [Validators.required]],
      categories: [['']],
      ingredients: [['']],
      quantity: 0,
      price: 0,
      photos: [["placeholder.png"]],
      description: ""
    });
    this.initialValues = this.myform.value;
    this.name = this.myform.get('name') as AbstractControl;
  }

  onSubmit() {
    if (this.myform.valid) {
      console.log("submited", this.myform.value);
      this.dishData.add(this.myform.value as IDish);
      this.snackBar.open('Dodano danie!', '', {
        duration: 2000
      })
    }
  }
  changeCategories(categories: string[]) {
    this.myform.get("categories")!.setValue(categories);
  }
  changeIngredients(ingredients: string[]) {
    this.myform.get("ingredients")!.setValue(ingredients);
  }
  changeCuisine(cuisine: string[]) {
    this.myform.get('cuisine')!.setValue(cuisine[0]);
  }
}
