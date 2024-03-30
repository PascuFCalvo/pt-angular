import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  http = inject(HttpClient);
  clients: any = [];
  pages: number = 2;

  fetchUsers() {
    for (let i = 1; i <= this.pages; i++) {
      this.http
        .get(`https://reqres.in/api/users?page=${i}`)
        .subscribe((clients: any) => {
          this.clients = [...this.clients, ...clients.data];
        });
    }
  }
}
