import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  {
    path: '',
    component: LoginSignupComponent
  },
  {
    path: 'todolist',
    component: TodosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
