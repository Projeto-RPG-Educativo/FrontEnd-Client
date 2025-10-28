import api from '../../services/api/api';

import type {
  LoginUserRequest,
  RegisterUserRequest,
  LoginResponse,
} from '../../types';

// ==================== LOGIN ====================

export const login = async (data: LoginUserRequest): Promise<LoginResponse> => {
  try {
    console.log('🔐 [AuthService] Fazendo login...');

    // ATUALIZADO: Usando o DTO 'LoginResponse' e passando 'data' diretamente
    const response = await api.post<LoginResponse>('/auth/login', data);

    // Salvar token no localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('✅ [AuthService] Login bem-sucedido. Token salvo.');
    }

    return response.data;
  } catch (error: any) {
    console.error('❌ [AuthService] Erro ao fazer login:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Erro ao fazer login');
  }
};

// ==================== REGISTRO ====================

export const register = async (
  data: RegisterUserRequest
): Promise<LoginResponse> => {
  try {
    console.log('📝 [AuthService] Registrando novo usuário...');

    // ATUALIZADO: Usando 'LoginResponse' e 'data'
    const response = await api.post<LoginResponse>('/auth/register', data);

    // Salvar token no localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('✅ [AuthService] Registro bem-sucedido. Token salvo.');
    }

    return response.data;
  } catch (error: any) {
    console.error('❌ [AuthService] Erro ao registrar:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Erro ao registrar usuário');
  }
};

// ==================== LOGOUT ====================
/**
 * Faz logout do usuário (remove token do localStorage)
 */
export const logout = (): void => {
  console.log('👋 [AuthService] Fazendo logout...');
  localStorage.removeItem('token');
  console.log('✅ [AuthService] Token removido. Logout concluído.');
};

// ==================== VERIFICAR AUTENTICAÇÃO ====================
/**
 * Verifica se o usuário está autenticado (possui token)
 * @returns true se autenticado, false caso contrário
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return token !== null && token !== '';
};

// ==================== OBTER TOKEN ====================
/**
 * Retorna o token de autenticação armazenado
 * @returns Token ou null
 */
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export default {
  login,
  register,
  logout,
  isAuthenticated,
  getToken,
};
