export interface User {
  id: number;
  email: string;
  token: string;
}

export interface AuthResponse {
  userId: string;
  token: string;
}

