import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    public snackbar: MatSnackBar,
    private zone: NgZone) { }

  hide = true;

  @Output() reset = new EventEmitter();

  signInForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  })

  ngOnInit(): void {
  }

  signIn() {
    let email = this.signInForm.get('email')?.value
    let password = this.signInForm.get('password')?.value

    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        this.router.navigate(['todolist'])
        // ...
      })
      .catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        this.snackbar.open(error.message, "", { duration: 5000 })
      });

  }

  signInWithGoogle() {

    var provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider).then((details) => {
      console.log(details);
      if (details?.user?.uid) {
        this.router.navigate(['todolist'])
      }
      else {
        this.snackbar.open('Signup failed', "", { duration: 5000 })
      }
    })

  }

  resetBtn() {
    this.reset.emit(true)
  }

}
