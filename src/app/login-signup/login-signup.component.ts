import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    public snackbar: MatSnackBar,
    private zone: NgZone
  ) { }

  hide = true;
  signup = true

  signUpForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    reEnterPassword: new FormControl("", [Validators.required]),
  })


  ngOnInit(): void {

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
      this.router.navigate(['todolist'])
    } else {
        // No user is signed in.
        this.zone.run(() => {
          this.router.navigate(['']);
        });
      }
    });
  }

}
