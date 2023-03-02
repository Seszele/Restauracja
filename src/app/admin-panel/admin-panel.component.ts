import { L } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthDataService } from '../auth-data.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  users: string[] = [];
  constructor(private db: AngularFirestore, public authService: AuthDataService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.load()
  }
  //load current users
  load() {
    this.users = [];
    this.db.collection('users').ref.get().then(user => {
      user.forEach(u => {
        this.users.push(u.id);
      })

    })
  }
  changePersistance() {
    this.snackBar.open('Zmieniono persystencje!', '', {
      duration: 2000
    })
  }
}
