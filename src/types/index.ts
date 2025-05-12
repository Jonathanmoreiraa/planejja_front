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

export interface ApiRevenue {
  id: number;
  user_id: number;
  description: string;
  due_date: string;
  value: string;
  received: number;
  created: string;
  modified: string;
  DeletedAt: string | null;
}

export interface Revenue {
  id: number;
  status: 'Received' | 'Pending' | 'Overdue';
  description: string;
  dueDate: string;
  value: number;
}

export interface EditRevenue {
  value: number;
  description: string;
  due_date: string | null;
  received: number;
}

export interface Expense {
  id: number;
  user_id: number;
  category: string;
  category_id: number;
  description: string;
  value: number;
  due_date: string;
  paid: number;
  situation: string;
  multiple_payments: boolean;
  num_installments: number;
  payment_day: number;
}