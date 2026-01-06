import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceResponse } from '../shared/models';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  invoice?: InvoiceResponse;
  id?: string;
  paymentsWithBalance: any[] = [];
  remainingBalance: number = 0;
  totalPaid: number = 0;
  status: 'PAYEE' | 'PARTIELLE' | 'IMPAYEE' = 'IMPAYEE';
  error: string | null = null;

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService, private router: Router, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.id) {
      this.loadInvoice(this.id);
    }
  }

  loadInvoice(id: string) {
    console.log('Loading invoice...', id);
    this.error = null;
    this.invoiceService.getById(id).subscribe({
      next: (inv) => {
        console.log('Invoice loaded:', inv);
        this.invoice = inv;
        this.calculateBalances();
        // ensure Angular updates view after processing
        try {
          this.cd.detectChanges();
        } catch (e) {
          console.debug('Change detection failed:', e);
        }
      },
      error: (err) => {
        console.error('Erreur chargement facture', err);
        this.error = "Impossible de charger les données. Le serveur est peut-être inaccessible.";
      },
      complete: () => console.log('Subscription complete')
    });
  }

  retry() {
    if (this.id) this.loadInvoice(this.id);
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  calculateBalances() {
    if (!this.invoice) return;
    
    const total = Number(this.invoice.total) || 0;
    this.remainingBalance = total;
    this.totalPaid = 0;

    if (!this.invoice.payments || this.invoice.payments.length === 0) {
        this.status = 'IMPAYEE';
        return;
    }
    
    // Sort payments by date
    const sortedPayments = [...this.invoice.payments].sort((a, b) => {
        return new Date(a.date!).getTime() - new Date(b.date!).getTime();
    });

    let paidSoFar = 0;

    this.paymentsWithBalance = sortedPayments.map(p => {
      const amt = Number(p.amount) || 0;
      paidSoFar = this.round(paidSoFar + amt);
      return { ...p, remaining: this.round(total - paidSoFar) };
    });
    
    this.totalPaid = paidSoFar;
    this.remainingBalance = this.round(total - paidSoFar);

    if (this.remainingBalance <= 0) {
        this.status = 'PAYEE';
    } else if (this.totalPaid > 0) {
        this.status = 'PARTIELLE';
    } else {
        this.status = 'IMPAYEE';
    }
  }

  edit() {
    if (this.id) this.router.navigate(['/invoices', this.id, 'edit']);
  }
}

