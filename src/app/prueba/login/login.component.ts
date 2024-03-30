import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  http = inject(HttpClient);
  email: string;
  password: string;
  token: any;
  logedIn: boolean;
  error:boolean;


  constructor() {
    this.email = '';
    this.password = '';
    this.logedIn = false;
    this.error=false;
  }

  login() {
    const data = {
      email: this.email,
      password: this.password,
    };
    const url = 'https://reqres.in/api/login';

    if (this.email === '' || this.password === '') {
      console.log('Email o Password vacios');
      this.error=true;
      return;
    }

    this.http.post(url, data).subscribe((response: any) => {
      console.log(response);
      this.token = response.token;
      this.logedIn = true;
    });
    console.log(`Logeado con Email: ${this.email}, Password: ${this.password}`);
  }
}
