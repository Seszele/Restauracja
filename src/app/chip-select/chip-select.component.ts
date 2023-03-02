import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: 'chip-select',
  templateUrl: './chip-select.component.html',
  styleUrls: ['./chip-select.component.css']
})
export class ChipSelectComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredChips!: Observable<string[]>;
  selectedChips: string[] = [];
  @Input() baseChips: string[] = ['japońska', 'polska', 'włoska', 'Orange', 'Strawberry'];
  @Input() label: string = "Wybierz";
  @Input() placeholder: string = "dodaj";
  @Input() appearance: any = "outline";
  @Output() chipsChanged = new EventEmitter<string[]>(); //tu mozna wyslac np dish jako event argument

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  constructor() {
  }

  ngOnInit(): void {
    this.filteredChips = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.baseChips.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedChips.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.chipsChanged.emit([...this.selectedChips]);

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.selectedChips.indexOf(fruit);

    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    }
    this.chipsChanged.emit([...this.selectedChips]);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedChips.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    this.chipsChanged.emit([...this.selectedChips]);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.baseChips.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}
