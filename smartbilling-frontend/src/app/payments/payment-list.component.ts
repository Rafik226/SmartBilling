import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../services/payment.service';
import { PaymentResponse } from '../shared/models';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  payments: PaymentResponse[] = [];

  constructor(private paymentService: PaymentService, private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit(): void {
    this.paymentService.getAll().subscribe((p) => (this.payments = p));
  }

  create() {
    this.router.navigate(['/payments', 'new']);
  }

  viewInvoiceByReference(reference?: string) {
    if (!reference) return;
    this.invoiceService.getByReference(reference).subscribe((inv) => {
      if (inv?.id) this.router.navigate(['/invoices', inv.id]);
    });
  }
}
