import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceResponse, InvoiceRequest, LineItemRequest, LineItemResponse, ClientResponse } from '../shared/models';
import { InvoiceService } from '../services/invoice.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {
  model: Partial<InvoiceResponse> = { items: [] };
  id?: string;
  clients: ClientResponse[] = [];
  clientId?: string;

  // search/typeahead state
  searchTerm = '';
  filteredClients: ClientResponse[] = [];
  showClientDropdown = false;

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService, private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    this.clientService.getAll().subscribe((cs) => {
      this.clients = cs;
      this.filteredClients = [...this.clients];
    });
    if (this.id && this.id !== 'new') {
      this.invoiceService.getById(this.id).subscribe((c) => {
        this.model = c || {};
        this.clientId = c?.client?.id;
        this.searchTerm = c?.client?.name || '';
      });
    }
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
    const q = (term || '').toLowerCase().trim();
    if (!q) {
      this.filteredClients = [...this.clients];
    } else {
      this.filteredClients = this.clients.filter((c) => (c.name || '').toLowerCase().includes(q) || (c.company || '').toLowerCase().includes(q));
    }
    this.showClientDropdown = true;
  }

  selectClient(c: ClientResponse) {
    this.clientId = c.id;
    this.model.client = c;
    this.searchTerm = c.name || '';
    this.showClientDropdown = false;
  }

  onClientChange() {
    this.model.client = this.clients.find((c) => c.id === this.clientId) || undefined;
    this.searchTerm = this.model.client?.name || '';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: Event) {
    const target = e.target as HTMLElement;
    // if click outside typeahead input/dropdown, close dropdown
    if (!target.closest('.client-typeahead')) {
      this.showClientDropdown = false;
    }
  }

  save() {
    const itemsReq: LineItemRequest[] = (this.model.items || []).map((it) => ({
      description: it.description || '',
      quantity: it.quantity || 0,
      unitPrice: it.unitPrice || 0,
    }));

    const req: InvoiceRequest = {
      id: this.model.id,
      reference: this.model.reference,
      invoiceDate: this.model.invoiceDate,
      items: itemsReq,
      clientId: this.clientId,
    };

    if (this.id && this.id !== 'new') {
      this.invoiceService.updateById(this.id, { ...this.model, client: this.model.client }).subscribe(() => this.router.navigate(['/invoices']));
    } else {
      this.invoiceService.create(req).subscribe(() => this.router.navigate(['/invoices']));
    }
  }

  addLine() {
    const line: LineItemResponse = { description: 'Nouvelle ligne', quantity: 1, unitPrice: 0, lineTotal: 0 } as LineItemResponse;
    (this.model.items ||= []).push(line);
  }

  cancel() {
    this.router.navigate(['/invoices']);
  }
}
