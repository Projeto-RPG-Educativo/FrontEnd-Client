export interface User { 
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterUserRequest {
  nomeUsuario: string;
  email: string;
  senha: string;
}

export interface LoginUserRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
