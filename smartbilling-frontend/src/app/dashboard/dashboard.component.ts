import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../services/invoice.service';
import { PaymentService } from '../services/payment.service';
import { ClientService } from '../services/client.service';
import { DashboardChartsComponent } from './dashboard-charts.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardChartsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  invoicesCount = 0;
  clientsCount = 0;
  paymentsTotal = 0;

  constructor(private invoiceService: InvoiceService, private paymentService: PaymentService, private clientService: ClientService) {}

  ngOnInit(): void {
    this.invoiceService.getAll().subscribe((inv) => (this.invoicesCount = inv.length));
    this.clientService.getAll().subscribe((c) => (this.clientsCount = c.length));
    this.paymentService.getAll().subscribe((p) => (this.paymentsTotal = p.reduce((s, x) => s + (x.amount || 0), 0)));
  }
}
