import { Routes } from '@angular/router';
import { UserComponent } from './prueba/users/users.component';
import { LoginComponent } from './prueba/login/login.component';
import { SingleUserComponent } from './prueba/single-user/single-user.component';

export const routes: Routes = [
  { path: 'prueba/users', component: UserComponent },
  { path: 'prueba/login', component: LoginComponent },
  { path: 'prueba/single-user', component: SingleUserComponent },
];
