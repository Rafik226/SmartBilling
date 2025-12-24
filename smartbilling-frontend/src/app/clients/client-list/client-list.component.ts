import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { ClientResponse } from '../../shared/models/client.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {
  clients: ClientResponse[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getAll().then(c => (this.clients = c || []));
  }
}
