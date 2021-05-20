import { Component, OnInit } from '@angular/core';
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
    private db: AngularFireDatabase,
    private router:Router,
    public snackbar:MatSnackBar
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
        this.router.navigate([''])
      }
    });
    
  }

  signIn() {
    this.signup = false;
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
        });
    }
    else{
      this.snackbar.open('Passwords donot match',"",{duration:5000})
    }

  }

}
