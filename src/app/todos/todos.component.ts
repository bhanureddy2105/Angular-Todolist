import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  constructor() { }

  title: any

  todos: string[] = ['Bhanu', 'prakash']

  todo = new FormGroup({
    check: new FormControl(false),
    item: new FormControl("",[Validators.required])
  })

  ngOnInit(): void {
    this.title = moment().format('dddd');
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
