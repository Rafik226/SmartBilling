import { ClientResponse } from './client.model';
import { LineItemRequest, LineItemResponse } from './line-item.model';

export interface InvoiceRequest {
  clientReference?: string;
  reference?: string;
  clientEmail?: string;
  invoiceDate?: string; // ISO date string
  items?: LineItemRequest[];
}

export interface InvoiceResponse {
  reference?: string;
  client?: ClientResponse;
  invoiceDate?: string;
  items?: LineItemResponse[];
  total?: number;
}
