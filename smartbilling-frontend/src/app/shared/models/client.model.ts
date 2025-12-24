export interface ClientRequest {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
}

export interface ClientResponse {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
}
