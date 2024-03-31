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
  error: boolean;
  pages: number;
  emails: any = [];

  constructor() {
    this.email = '';
    this.password = '';
    this.logedIn = false;
    this.error = false;
    this.pages = 2;
  }

  ngOnInit() {
    this.fetchEmails();
  }

  fetchEmails() {
    for (let i = 1; i <= this.pages; i++) {
      this.http
        .get(`https://reqres.in/api/users?page=${i}`)
        .subscribe((emails: any) => {
          this.emails = [
            ...this.emails,
            ...emails.data.map((email: any) => email.email),
          ];
          return this.emails;
        });
    }
  }

  login() {
    const data = {
      email: this.email,
      password: this.password,
    };
    const url = 'https://reqres.in/api/login';

    if (this.email === '' || this.password === '') {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 2000);
      localStorage.setItem('token', '');
    }

    if (!this.emails.includes(this.email)) {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 2000);
      localStorage.setItem('token', '');
    }

    this.http.post(url, data).subscribe((response: any) => {
      this.token = response.token;
      localStorage.setItem('token', this.token);

      if (this.token !== '') {
        console.log('Login correcto');
        this.logedIn = true;
      } else {
        console.log('Login erroneo');
        this.logedIn = false;
      }
    });
  }
}
