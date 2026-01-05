import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.id) {
      this.invoiceService.getById(this.id).subscribe((inv) => (this.invoice = inv));
    }
  }

  edit() {
    if (this.id) this.router.navigate(['/invoices', this.id, 'edit']);
  }
}

