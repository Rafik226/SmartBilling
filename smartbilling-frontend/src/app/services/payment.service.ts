import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PaymentResponse, PaymentRequest } from '../shared/models';
import { createInitialStore } from '../mocks/mock-data';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private store = createInitialStore();
  private subject = new BehaviorSubject<PaymentResponse[]>(this.store.payments);

  getAll(): Observable<PaymentResponse[]> {
    return this.subject.asObservable();
  }

  getByInvoice(reference: string): Observable<PaymentResponse[]> {
    return of(this.store.payments.filter((p) => p.invoiceReference === reference));
  }

  create(pay: PaymentRequest): Observable<PaymentResponse> {
    const newP: PaymentResponse = { invoiceReference: pay.invoiceReference || '', amount: pay.amount, date: pay.date || new Date().toISOString(), method: pay.method, reference: pay.reference };
    this.store.payments.push(newP);
    this.subject.next(this.store.payments);
    return of(newP);
  }

  deleteByReference(reference: string): Observable<void> {
    this.store.payments = this.store.payments.filter((p) => p.reference !== reference);
    this.subject.next(this.store.payments);
    return of(undefined);
  }
}
