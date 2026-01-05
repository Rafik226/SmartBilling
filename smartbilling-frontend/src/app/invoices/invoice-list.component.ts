import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { InvoiceResponse } from '../shared/models';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: InvoiceResponse[] = [];

  constructor(private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit(): void {
    this.invoiceService.getAll().subscribe((i) => (this.invoices = i));
  }

  openInvoice(id?: string) {
    console.log('openInvoice called', id);
    if (!id) return;
    this.router.navigateByUrl(`/invoices/${id}`);
  }

  edit(id?: string) {
    console.log('edit invoice', id);
    if (!id) return;
    this.router.navigateByUrl(`/invoices/${id}/edit`);
  }

  create() {
    console.log('create invoice');
    this.router.navigateByUrl('/invoices/new');
  }
}
