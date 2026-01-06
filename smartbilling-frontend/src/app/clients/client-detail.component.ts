import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { ClientResponse } from '../shared/models';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  client?: ClientResponse;
  id?: string;

  constructor(private route: ActivatedRoute, private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.id) {             
      this.clientService.getById(this.id).subscribe({
        next: (c) => {
          console.log('Client loaded:', c);
          this.client = c;
        },
        error: (err) => {
          console.error('Failed to load client', err);
        }
      });
    }
  }

  edit() {
    if (this.id) this.router.navigate(['/clients', this.id, 'edit']);
  }

  getAddress(): string {
    return this.client?.address ?? '—';
  }
}
