import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { InvoiceResponse, InvoiceRequest, LineItemResponse, LineItemRequest } from '../shared/models';
import { createInitialStore } from '../mocks/mock-data';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private store = createInitialStore();
  private subject = new BehaviorSubject<InvoiceResponse[]>(this.store.invoices);

  getAll(): Observable<InvoiceResponse[]> {
    return this.subject.asObservable();
  }

  getById(id: string): Observable<InvoiceResponse | undefined> {
    return of(this.store.invoices.find((i) => i.id === id));
  }

  getByReference(reference: string): Observable<InvoiceResponse | undefined> {
    return of(this.store.invoices.find((i) => i.reference === reference));
  }

  create(inv: InvoiceRequest): Observable<InvoiceResponse> {
    const id = 'i' + Date.now();
    const items = inv.items || [];
    const total = items.reduce((s, it) => s + (it.quantity * it.unitPrice), 0);
    const newInv: InvoiceResponse = {
      id,
      reference: inv.reference || `F-${new Date().getFullYear()}-${Date.now()}`,
      client: undefined as any,
      invoiceDate: inv.invoiceDate || new Date().toISOString(),
      items: items.map((it) => ({ ...it } as LineItemResponse)),
      total,
    };
    this.store.invoices.push(newInv);
    this.subject.next(this.store.invoices);
    return of(newInv);
  }

  updateById(id: string, inv: Partial<InvoiceResponse>): Observable<InvoiceResponse | undefined> {
    const idx = this.store.invoices.findIndex((i) => i.id === id);
    if (idx === -1) return of(undefined);
    const updated: InvoiceResponse = { ...this.store.invoices[idx], ...inv } as InvoiceResponse;
    if (updated.items) {
      updated.total = updated.items.reduce((s, it) => s + ((it.quantity || 0) * (it.unitPrice || 0)), 0);
    }
    this.store.invoices[idx] = updated;
    this.subject.next(this.store.invoices);
    return of(updated);
  }

  update(reference: string, inv: Partial<InvoiceResponse>): Observable<InvoiceResponse | undefined> {
    const idx = this.store.invoices.findIndex((i) => i.reference === reference);
    if (idx === -1) return of(undefined);
    const updated: InvoiceResponse = { ...this.store.invoices[idx], ...inv } as InvoiceResponse;
    // recalc total if items updated
    if (updated.items) {
      updated.total = updated.items.reduce((s, it) => s + ((it.quantity || 0) * (it.unitPrice || 0)), 0);
    }
    this.store.invoices[idx] = updated;
    this.subject.next(this.store.invoices);
    return of(updated);
  }

  deleteById(id: string): Observable<void> {
    this.store.invoices = this.store.invoices.filter((i) => i.id !== id);
    this.subject.next(this.store.invoices);
    return of(undefined);
  }

  delete(reference: string): Observable<void> {
    this.store.invoices = this.store.invoices.filter((i) => i.reference !== reference);
    this.subject.next(this.store.invoices);
    return of(undefined);
  }

  addItemToId(id: string, item: LineItemRequest): Observable<LineItemResponse> {
    const inv = this.store.invoices.find((i) => i.id === id);
    if (!inv) return of(item as LineItemResponse);
    const newItem: LineItemResponse = { ...item, lineTotal: item.quantity * item.unitPrice } as LineItemResponse;
    inv.items = inv.items || [];
    inv.items.push(newItem);
    inv.total = (inv.total || 0) + (newItem.lineTotal ?? 0);
    this.subject.next(this.store.invoices);
    return of(newItem);
  }

  addItem(reference: string, item: LineItemRequest): Observable<LineItemResponse> {
    const inv = this.store.invoices.find((i) => i.reference === reference);
    if (!inv) return of(item as LineItemResponse);
    const newItem: LineItemResponse = { ...item, lineTotal: item.quantity * item.unitPrice } as LineItemResponse;
    inv.items = inv.items || [];
    inv.items.push(newItem);
    inv.total = (inv.total || 0) + (newItem.lineTotal ?? 0);
    this.subject.next(this.store.invoices);
    return of(newItem);
  }

  removeItem(reference: string, index: number): Observable<void> {
    const inv = this.store.invoices.find((i) => i.reference === reference);
    if (!inv) return of(undefined);
    inv.items = (inv.items || []).filter((_, idx) => idx !== index);
    inv.total = (inv.items || []).reduce((s, it) => s + (it.lineTotal || 0), 0);
    this.subject.next(this.store.invoices);
    return of(undefined);
  }
}
