import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-charts.component.html',
})
export class DashboardChartsComponent {
  @Input() invoicesCount: number = 0;
  @Input() clientsCount: number = 0;
  @Input() paymentsTotal: number = 0;

  get total(): number {
    return this.clientsCount + this.invoicesCount || 1;
  }
  get clientsDashArray(): number {
    return Math.round((this.clientsCount / this.total) * 100);
  }
  get invoicesDashArray(): number {
    return Math.round((this.invoicesCount / this.total) * 100);
  }
  get otherDashArray(): number {
    return 100 - this.clientsDashArray - this.invoicesDashArray;
  }
}
