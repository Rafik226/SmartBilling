import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { InvoiceResponse } from '../../shared/models/invoice.model';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html'
})
export class InvoiceListComponent implements OnInit {
  invoices: InvoiceResponse[] = [];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService.list().then(i => (this.invoices = i || []));
  }
}
