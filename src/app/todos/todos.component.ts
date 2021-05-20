import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';

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
    public snackbar: MatSnackBar
    ) { }

  title: any

  todos: string[] = ['Bhanu', 'prakash']

  todo = new FormGroup({
    check: new FormControl(false),
    item: new FormControl("", [Validators.required])
  })

  ngOnInit(): void {
    var user = this.afAuth.currentUser;

    if (user) {
      // User is signed in.
      this.title = moment().format('dddd');
    } else {
      // No user is signed in.
      this.router.navigate([''])
    }
  }

  addTodo() {
    let todo = this.todo.get('item')?.value
    this.todos.push(todo);
    this.todo.get('item')?.setValue("");
  }

  onCheckboxChange(event: any, todo: string) {
    if (event.checked) {
      this.todos = this.todos.filter((x) => x != todo)
    }
  }

}
