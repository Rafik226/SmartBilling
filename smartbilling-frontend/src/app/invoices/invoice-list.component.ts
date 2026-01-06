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
    if (!id) return;
    this.router.navigateByUrl(`/invoices/${id}`);
  }

  edit(id?: string) {
    if (!id) return;
    if (!id) return;
    this.router.navigateByUrl(`/invoices/${id}/edit`);
  }

  create() {
    this.router.navigateByUrl('/invoices/new');
  }
}
