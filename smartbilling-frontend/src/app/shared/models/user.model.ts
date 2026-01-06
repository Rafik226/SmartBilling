export interface User {
  id?: number;
  username: string;
  password?: string; // Required for creation, optional for display/update if not changing
  fullName: string;
  email: string;
  roles?: string[];
  sub?: string;
}

export interface UserCreateDto {
  username: string;
  password: string;
  fullName: string;
  email: string;
  roles?: string[];
}
