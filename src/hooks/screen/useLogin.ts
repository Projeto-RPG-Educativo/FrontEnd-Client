import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

interface UseLoginReturn {
  // Estados do formulário
  username: string;
  password: string;
  error: string | null;
  loading: boolean;
  isFormValid: boolean;
  
  // Ações
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  handleLogin: (onSuccess: (token: string, user: any) => void) => Promise<void>;
  clearError: () => void;
}

/**
 * Hook específico para a tela de Login
 * 
 * Gerencia o estado do formulário de login e integra com useAuth
 * 
 * @example
 * ```tsx
 * const LoginScreen = () => {
 *   const {
 *     username,
 *     password,
 *     error,
 *     loading,
 *     isFormValid,
 *     setUsername,
 *     setPassword,
 *     handleLogin,
 *   } = useLogin();
 * 
 *   const handleSubmit = async (e: React.FormEvent) => {
 *     e.preventDefault();
 *     await handleLogin((token, user) => {
 *       // Redirecionar para o jogo
 *     });
 *   };
 * };
 * ```
 */
export const useLogin = (): UseLoginReturn => {
  const [username, setUsernameState] = useState('');
  const [password, setPasswordState] = useState('');
  const { handleLogin: loginService, loading, error, clearError } = useAuth();

  // Validação do formulário
  const isFormValid = username.trim().length >= 3 && password.length >= 6;

  // Setter para username que limpa erro
  const setUsername = useCallback((newUsername: string) => {
    setUsernameState(newUsername);
    clearError();
  }, [clearError]);

  // Setter para password que limpa erro
  const setPassword = useCallback((newPassword: string) => {
    setPasswordState(newPassword);
    clearError();
  }, [clearError]);

  // Fazer login
  const handleLogin = useCallback(async (
    onSuccess: (token: string, user: any) => void
  ) => {
    if (!isFormValid) {
      return;
    }

    const result = await loginService(username.trim(), password);
    
    if (result) {
      onSuccess(result.token, result.user);
    }
  }, [username, password, isFormValid, loginService]);

  return {
    username,
    password,
    error: error ? error.message : null,
    loading,
    isFormValid,
    setUsername,
    setPassword,
    handleLogin,
    clearError,
  };
};
