import { Component } from '@angular/core';
import { ClientService } from '../client.service';
import { ClientRequest } from '../../shared/models/client.model';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html'
})
export class ClientFormComponent {
  client: ClientRequest = { name: '', email: '' };

  constructor(private clientService: ClientService) {}

  save() {
    this.clientService.create(this.client).then(() => {
      // TODO: notifier
    });
  }
}
