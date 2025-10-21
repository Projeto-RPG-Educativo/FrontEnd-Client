import { useState } from 'react';
import { login, register, logout, isAuthenticated, getToken } from '../../services/auth/AuthService';
import type { AuthResponse } from '../../types/User';

interface UseAuthReturn {
  carregando: boolean;
  erro: Error | null;
  autenticado: boolean;
  token: string | null;
  fazerLogin: (usuario: string, senha: string) => Promise<AuthResponse | null>;
  fazerRegistro: (nome: string, email: string, senha: string) => Promise<AuthResponse | null>;
  fazerLogout: () => void;
  limparErro: () => void;
}

/**
 * Hook para gerenciar autenticação de usuários
 * 
 * @example
 * ```tsx
 * const { fazerLogin, carregando, erro, autenticado } = useAuth();
 * 
 * const handleLogin = async () => {
 *   const resultado = await fazerLogin('email@example.com', 'senha123');
 *   if (resultado) {
 *     console.log('Login bem-sucedido!', resultado.user);
 *   }
 * };
 * ```
 */
export const useAuth = (): UseAuthReturn => {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<Error | null>(null);

  const fazerLogin = async (
    usuario: string,
    senha: string
  ): Promise<AuthResponse | null> => {
    setCarregando(true);
    setErro(null);
    try {
      const resultado = await login(usuario, senha);
      return resultado;
    } catch (error) {
      setErro(error as Error);
      return null;
    } finally {
      setCarregando(false);
    }
  };

  const fazerRegistro = async (
    nome: string,
    email: string,
    senha: string
  ): Promise<AuthResponse | null> => {
    setCarregando(true);
    setErro(null);
    try {
      const resultado = await register(nome, email, senha);
      return resultado;
    } catch (error) {
      setErro(error as Error);
      return null;
    } finally {
      setCarregando(false);
    }
  };

  const fazerLogout = () => {
    logout();
  };

  const limparErro = () => {
    setErro(null);
  };

  return {
    carregando,
    erro,
    autenticado: isAuthenticated(),
    token: getToken(),
    fazerLogin,
    fazerRegistro,
    fazerLogout,
    limparErro,
  };
};
