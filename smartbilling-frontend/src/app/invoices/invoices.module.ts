import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

@NgModule({
  imports: [CommonModule, InvoiceListComponent, InvoiceDetailComponent],
  exports: [InvoiceListComponent, InvoiceDetailComponent]
})
export class InvoicesModule {}
