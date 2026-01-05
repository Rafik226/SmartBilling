export interface ClientRequest {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
  avatarUrl?: string;
}

export interface ClientResponse {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  avatarUrl?: string;
  address?: string;
}
