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
      return;
    }

    if (!this.emails.includes(this.email)) {
      this.error = true;
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
