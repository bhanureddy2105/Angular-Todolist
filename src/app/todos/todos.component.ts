import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    public snackbar: MatSnackBar,
  ) { }

  title: any

  todos: any[] = []

  todo = new FormGroup({
    check: new FormControl(false),
    item: new FormControl("", [Validators.required])
  })

  ngOnInit(): void {

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.title = moment().format('MMM Do dddd');
      } else {
        // No user is signed in.
          this.router.navigate(['']);
      }
    });
    this.getTodos()
  }

  async getTodos() {
    const user = await this.getUser();
    if (user) {
      return this.db.object(`todos/${user.uid}`).valueChanges().subscribe((todos: any) => {
        if (todos) {
          let resp
          this.todos.length = 0
          for (const key in todos) {
            resp = todos[key]
            resp['id'] = key
            this.todos.push(resp)
          }
          console.log(resp);
        }
        else {
          this.todos.length = 0
        }
      });

    }
    else {
      return ""
    }
  }

  getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async setTodos(todo: string) {
    const user = await this.getUser();
    if (user) {
      this.todos.length = 0
      return this.db.object(`todos/${user.uid}`).query.ref.push(
        {
          todo,
          isChecked: false
        }
      );
    }
    else {
      return ""
    }
  }

  addTodo() {
    let todo = this.todo.get('item')?.value
    this.todo.get('item')?.setValue("");
    this.setTodos(todo)
  }

  async onCheckboxChange(event: any, todo: any) {
    const user = await this.getUser();
    if (user) {
      if (event.checked) {
        return this.db.object(`todos/${user.uid}/${todo.id}`).update({
          isChecked: true,
        })
      }
      else {
        return this.db.object(`todos/${user.uid}/${todo.id}`).update({
          isChecked: false,
        })
      }
    }

  }

  async onDelete(todo: any) {
    const user = await this.getUser();
    if (user) {
      return this.db.object(`todos/${user.uid}/${todo.id}`).remove()
    }
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      // Sign-out successful.
      this.router.navigate([''])
      this.snackbar.open("Logout Successfull", "", { duration: 5000 })
    }).catch((error) => {
      // An error happened.
      this.snackbar.open(error.message, "", { duration: 5000 })
    });
  }

}
