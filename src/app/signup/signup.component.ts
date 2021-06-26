import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    public snackbar: MatSnackBar,
    private zone: NgZone) { }

  hide = true;
  hide2 = true;
  signup = true

  signUpForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    reEnterPassword: new FormControl("", [Validators.required]),
  })

  ngOnInit(): void {
  }

  signUp() {
    let email = this.signUpForm.get('email')?.value
    let password = this.signUpForm.get('password')?.value
    let reEnterPassword = this.signUpForm.get('reEnterPassword')?.value

    if (password === reEnterPassword) {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          console.log(user);
          this.router.navigate(['todolist'])
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
          this.snackbar.open(error.message, "", { duration: 5000 })
        });
    }
    else {
      this.snackbar.open('Passwords do not match', "", { duration: 5000 })
    }

  }

  signUpWithGoogle() {

    var provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider).then((details)=>{
      console.log(details);   
      if(details?.user?.uid){
        this.router.navigate(['todolist'])
      }
      else{
        this.snackbar.open('Signup failed', "", { duration: 5000 })
      }
    })

  }

}
