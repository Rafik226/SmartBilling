import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientResponse, ClientRequest } from '../shared/models';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  model: Partial<ClientRequest & ClientResponse> = {};
  id?: string;
  showToast = false;

  constructor(private route: ActivatedRoute, private clientService: ClientService, public router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.id && this.id !== 'new') {
      this.clientService.getById(this.id).subscribe((c) => (this.model = c || {}));
    }
  }

  save() {
    if (this.id && this.id !== 'new') {
      this.clientService.update(this.id, this.model).subscribe(() => {
        this.showSavedToastAndNavigate();
      });
    } else {
      this.clientService.create(this.model as ClientRequest).subscribe(() => {
        this.showSavedToastAndNavigate();
      });
    }
  }

  private showSavedToastAndNavigate() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.router.navigate(['/clients']);
    }, 900);
  }

  onFileSelected(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;
    // simulate upload by storing a fake avatarUrl on the model
    this.model['avatarUrl'] = URL.createObjectURL(file);
  }

  exportProfile() {
    // safe console usage from template
    // eslint-disable-next-line no-console
    console.log('Export client', this.model);
  }

  get computedTitle(): string {
    return this.model?.id ? 'Éditer client' : 'Nouveau client';
  }

  cancel() {
    this.router.navigate(['/clients']);
  }
}
