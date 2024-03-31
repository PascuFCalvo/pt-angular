import { Routes } from '@angular/router';
import { UserComponent } from './prueba/users/users.component';
import { LoginComponent } from './prueba/login/login.component';
import { SingleUserComponent } from './prueba/single-user/single-user.component';

export const routes: Routes = [
  {
    path: 'prueba',
    children: [
      { path: 'users', component: UserComponent },
      { path: 'login', component: LoginComponent },
      { path: 'single-user', component: SingleUserComponent },
    ],
  },
];
