export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  isActive: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
}
