import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PaymentResponse, PaymentRequest } from '../shared/models';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = 'https://morning-river-09236-d916246857b3.herokuapp.com/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PaymentResponse[]> {
    // Use backend global payments endpoint if available
    return this.http.get<PaymentResponse[]>(`${this.apiUrl}/payments`);
  }

  getByInvoice(invoiceId: string): Observable<PaymentResponse[]> {
    return this.http.get<PaymentResponse[]>(`${this.apiUrl}/invoices/${invoiceId}/payments`);
  }

  create(pay: PaymentRequest): Observable<PaymentResponse> {
    if (!pay.invoiceId) {
      throw new Error('Invoice ID is required');
    }
    return this.http.post<PaymentResponse>(`${this.apiUrl}/invoices/${pay.invoiceId}/payments`, pay);
  }

  delete(invoiceId: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/invoices/${invoiceId}/payments/${id}`);
  }
}
