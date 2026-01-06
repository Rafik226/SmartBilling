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
  model: Partial<PaymentRequest> = { date: new Date().toISOString(), method: 'BANK_TRANSFER' };
  invoices: InvoiceResponse[] = [];

  constructor(private paymentService: PaymentService, private invoiceService: InvoiceService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.invoiceService.getAll().subscribe((invs) => (this.invoices = invs));
  }

  save() {
    if (!this.model.invoiceId) {
      alert('Veuillez sélectionner une facture.');
      return;
    }
    this.paymentService.create(this.model as PaymentRequest).subscribe({
      next: () => this.router.navigate(['/payments']),
      error: (err) => {
        console.error('Erreur création paiement', err);
        alert('Erreur lors de la création du paiement: ' + err.message);
      }
    });
  }

  goToPayments() {
    this.router.navigate(['/payments']);
  }
}
