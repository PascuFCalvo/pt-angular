import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserComponent } from './prueba/users/users.component';
import { LoginComponent } from './prueba/login/login.component';
import { SingleUserComponent } from './prueba/single-user/single-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    UserComponent,
    LoginComponent,
    SingleUserComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular';
}
