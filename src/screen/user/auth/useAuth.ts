import { useState } from 'react';
import { login, register, logout, isAuthenticated, getToken } from '../../../services/auth/AuthService';
import type { AuthResponse, LoginUserRequest,RegisterUserRequest } from '../../../types/User';

interface UseAuthReturn {
  loading: boolean;
  error: Error | null;
  authenticated: boolean;
  token: string | null;
  handleLogin: (usuario: string, senha: string) => Promise<AuthResponse | null>;
  handleRegister: (nome: string, email: string, senha: string) => Promise<AuthResponse | null>;
  handleLogout: () => void;
  clearError: () => void;
}

/**
 * Hook para gerenciar autenticação de usuários
 * 
 * @example
 * ```tsx
 * const { handleLogin, loading, error, authenticated } = useAuth();
 * 
 * const handleLogin = async () => {
 *   const resultado = await handleLogin('email@example.com', 'senha123');
 *   if (resultado) {
 *     console.log('Login bem-sucedido!', resultado.user);
 *   }
 * };
 * ```
 */
export const useAuth = (): UseAuthReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleLogin = async (
    username: string,
    password: string
  ): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const data: LoginUserRequest = { username, password };
      const result = await login(data);
      return result;
    } catch (error) {
      setError(error as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (
    nome: string,
    email: string,
    senha: string
  ): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const data: RegisterUserRequest = { nomeUsuario: nome, email, senha };
      const result = await register(data);
      return result;
    } catch (error) {
      setError(error as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const clearError = () => {
    setError(null);
  };

  return {
    loading,
    error,
    authenticated: isAuthenticated(),
    token: getToken(),
    handleLogin,
    handleRegister,
    handleLogout,
    clearError,
  };
};
