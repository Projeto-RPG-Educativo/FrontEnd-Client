// --- REQUESTS ---

export interface RegisterUserRequest {
  username: string;
  email: string;
  password: string;
}


export interface LoginUserRequest {
  username: string;
  password: string;
}

// --- RESPONSES ---

export interface UserDto {
  id: number;
  nomeUsuario: string;
  email: string;
  criadoEm: string; // (LocalDateTime)
}


export interface LoginResponse {
  message: string;
  user: UserDto;
  token: string;
}