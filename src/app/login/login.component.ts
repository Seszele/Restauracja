import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myform!: FormGroup;
  isValid = true;
  constructor(private formBuilder: FormBuilder, private angularFireAuth: AngularFireAuth, private db: AngularFirestore, private router: Router, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.myform = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    });
  }
  onSubmit() {
    if (this.myform.valid) {
      this.snackBar.open("Pomyślnie zalogowano, witaj!", '', {
        duration: 1500
      });
      this.angularFireAuth.signInWithEmailAndPassword(this.myform.get('email')?.value, this.myform.get('password')?.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          this.myform.reset();
          this.router.navigate(['home']);
        })
        .catch((error) => {
          this.myform.reset();
          this.isValid = false;
        });
    }
  }



}
