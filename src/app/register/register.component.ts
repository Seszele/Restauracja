import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myform!: FormGroup;
  constructor(private formBuilder: FormBuilder, private angularFireAuth: AngularFireAuth, private db: AngularFirestore, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.myform = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }
  onSubmit() {
    if (this.myform.valid) {
      this.snackBar.open('Pomyślnie zarejestrowano, witaj!', '', {
        duration: 2000
      })
      this.angularFireAuth.createUserWithEmailAndPassword(this.myform.get('email')?.value, this.myform.get('password')?.value)
        .then((result) => {
          this.db.collection('users').doc(result.user?.uid).set({ 'email': result.user?.email, 'banned': false, 'cart': [], 'roles': ['klient'] });
          this.router.navigate(['home']);
        })
    }
  }
}
