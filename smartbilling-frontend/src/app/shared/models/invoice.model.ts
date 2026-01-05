import { ClientResponse } from './client.model';
import { LineItemRequest, LineItemResponse } from './line-item.model';

export interface InvoiceRequest {
  id?: string;
  clientReference?: string;
  reference?: string;
  clientId?: string;
  clientEmail?: string;
  invoiceDate?: string; // ISO date string
  items?: LineItemRequest[];
}

export interface InvoiceResponse {
  id?: string;
  reference?: string;
  client?: ClientResponse;
  invoiceDate?: string;
  items?: LineItemResponse[];
  total?: number;
}
