export interface PaymentRequest {
  invoiceReference?: string;
  amount: number;
  date: string; // ISO date string
  method: string;
  reference?: string;
}

export interface PaymentResponse {
  amount?: number;
  date?: string;
  method?: string;
  reference?: string;
  invoiceReference?: string;
}
