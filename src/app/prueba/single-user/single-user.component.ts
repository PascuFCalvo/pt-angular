import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-single-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './single-user.component.html',
  styleUrl: './single-user.component.css',
})
export class SingleUserComponent {
  http = inject(HttpClient);
  id: any;
  client: any = [];
  bringedUser: any;
  authorized: boolean;

  constructor() {
    this.id = '';
    this.bringedUser = false;
    this.authorized = false;
  }

  ngOnInit() {
    this.isAuthorized();
  }

  isAuthorized() {
    let token = localStorage.getItem('token');
    if (token !== '') {
      this.authorized = true;
    } else {
      this.authorized = false;
    }
  }

  userDetail() {
    const url = `https://reqres.in/api/users/${this.id}`;

    this.http.get(url).subscribe((response: any) => {
      this.client = response.data;
      this.bringedUser = true;
    });

    if (this.id > 12 || this.id < 1 || isNaN(this.id)) {
      alert('El ID debe ser un número entre 1 y 12');
      this.bringedUser = false;
    }
  }
}
