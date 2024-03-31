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
  filteredClient: any;
  details: boolean = false;
  usuariodetalle: any;
  authorized: boolean;

  constructor() {
    this.fetchUsers();
    this.filteredClient = [];
    this.authorized = false;
  }

  ngOnInit() {
    this.isAuthorized();
  }

  isAuthorized() {
    let token = localStorage.getItem('token');
    if (token !== "") {
      this.authorized = true;
    } else {
      this.authorized = false;
    }
  }

  fetchUsers() {
    for (let i = 1; i <= this.pages; i++) {
      this.http
        .get(`https://reqres.in/api/users?page=${i}`)
        .subscribe((clients: any) => {
          this.clients = [...this.clients, ...clients.data];
        });
    }
  }

  showDetails(clientId: number) {
    this.details = true;
    this.filteredClient = this.clients.filter(
      (client: any) => client.id === clientId
    );
    this.usuariodetalle = this.filteredClient[0];
    console.log(this.usuariodetalle);
  }

  closeDetails() {
    this.details = false;
  }
}
