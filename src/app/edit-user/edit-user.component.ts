import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthDataService } from '../auth-data.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  rolesControl = new FormControl();
  email = "Admin@gmail.com";
  isBanned: boolean[] = [false];
  disabled = false;
  @Input() userID!: string;
  constructor(private db: AngularFirestore, public authService: AuthDataService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    //highlight roles for this user
    this.db.collection("users").doc(this.userID).ref.get().then(user => {
      this.rolesControl.setValue(user.get("roles"));
      this.isBanned = [];
      this.isBanned.push(user.get("banned") as boolean);
      this.email = user.get("email");
    })
    this.authService.getCurrentUser().then(user => {
      if (user?.uid == this.userID) {
        this.disabled = true;
      }

    })
  }
  submit() {
    this.snackBar.open("Zaaktualizowano role dla: " + this.email, '', {
      duration: 2000
    })
    if (this.isBanned[0] === undefined) {
      this.isBanned[0] = false;
    }
    this.db.collection("users").doc(this.userID).update({ 'roles': this.rolesControl.value, 'banned': this.isBanned[0] })
  }

}
