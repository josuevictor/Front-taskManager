import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] },
  { path: 'tasks/new', component: TaskFormComponent, canActivate: [authGuard] },
  { path: 'tasks/edit/:id', component: TaskEditComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', redirectTo: '/tasks' }
];
