import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  logout() {
    this.snackBar.open("Pomyślnie wylogowano!", '', {
      duration: 2000
    });
    this.angularFireAuth.signOut().then(() => {
      this.router.navigate(['home']);
    })
  }

}
