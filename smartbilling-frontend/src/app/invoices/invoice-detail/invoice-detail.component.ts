import { Component, Input } from '@angular/core';
import { InvoiceResponse } from '../../shared/models/invoice.model';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html'
})
export class InvoiceDetailComponent {
  @Input() invoice?: InvoiceResponse;
}
