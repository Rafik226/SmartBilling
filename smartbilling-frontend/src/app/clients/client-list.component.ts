import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ClientResponse } from '../shared/models';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: ClientResponse[] = [];

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.clientService.getAll().subscribe((c) => (this.clients = c));
  }

  viewClient(id?: string) {
    console.log('viewClient', id);
    if (!id) return;
    this.router.navigateByUrl(`/clients/${id}`);
  }

  edit(id?: string) {
    console.log('edit client', id);
    if (!id) return;
    this.router.navigateByUrl(`/clients/${id}/edit`);
  }

  create() {
    console.log('create client');
    this.router.navigateByUrl('/clients/new');
  }

  delete(id?: string) {
    if (!id) return;
    this.clientService.delete(id).subscribe();
  }
}
