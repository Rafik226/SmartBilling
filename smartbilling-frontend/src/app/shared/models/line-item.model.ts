export interface LineItemRequest {
  description: string;
  quantity: number;
  unitPrice: number; // use number for amounts in frontend; backend uses BigDecimal
}

export interface LineItemResponse {
  description?: string;
  quantity?: number;
  unitPrice?: number;
  lineTotal?: number;
}
