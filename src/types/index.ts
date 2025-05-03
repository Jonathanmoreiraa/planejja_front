export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  birth_date: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: {
    access_token: string;
    expires_in: number;
    token_type: string;
  };
  user: {
    id: number;
  };
}