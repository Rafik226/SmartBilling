import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentRequest } from '../shared/models';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceResponse } from '../shared/models';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  model: Partial<PaymentRequest> = { date: new Date().toISOString(), method: 'Virement' };
  invoices: InvoiceResponse[] = [];

  constructor(private paymentService: PaymentService, private invoiceService: InvoiceService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.invoiceService.getAll().subscribe((invs) => (this.invoices = invs));
  }

  save() {
    this.paymentService.create(this.model as PaymentRequest).subscribe(() => this.router.navigate(['/payments']));
  }

  goToPayments() {
    this.router.navigate(['/payments']);
  }
}
