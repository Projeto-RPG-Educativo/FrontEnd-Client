import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

interface UseRegisterReturn {
  // Estados do formulário
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: string | null;
  success: string | null;
  loading: boolean;
  isFormValid: boolean;
  
  // Ações
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  handleRegister: (onSuccess: () => void) => Promise<void>;
  clearMessages: () => void;
}

/**
 * Hook específico para a tela de Registro
 * 
 * Gerencia o estado do formulário de registro e integra com useAuth
 * 
 * @example
 * ```tsx
 * const RegisterScreen = () => {
 *   const {
 *     name,
 *     email,
 *     password,
 *     confirmPassword,
 *     error,
 *     success,
 *     loading,
 *     isFormValid,
 *     setName,
 *     setEmail,
 *     setPassword,
 *     setConfirmPassword,
 *     handleRegister,
 *   } = useRegister();
 * 
 *   const handleSubmit = async (e: React.FormEvent) => {
 *     e.preventDefault();
 *     await handleRegister(() => {
 *       // Redirecionar para login
 *     });
 *   };
 * };
 * ```
 */
export const useRegister = (): UseRegisterReturn => {
  const [name, setNameState] = useState('');
  const [email, setEmailState] = useState('');
  const [password, setPasswordState] = useState('');
  const [confirmPassword, setConfirmPasswordState] = useState('');
  const [success, setSuccess] = useState<string | null>(null);
  
  const { handleRegister: registerService, loading, error, clearError } = useAuth();

  // Validação do formulário
  const isFormValid = 
    name.trim().length >= 3 &&
    email.includes('@') &&
    password.length >= 6 &&
    password === confirmPassword;

  // Limpa mensagens de erro e sucesso
  const clearMessages = useCallback(() => {
    clearError();
    setSuccess(null);
  }, [clearError]);

  // Setters que limpam mensagens
  const setName = useCallback((newName: string) => {
    setNameState(newName);
    clearMessages();
  }, [clearMessages]);

  const setEmail = useCallback((newEmail: string) => {
    setEmailState(newEmail);
    clearMessages();
  }, [clearMessages]);

  const setPassword = useCallback((newPassword: string) => {
    setPasswordState(newPassword);
    clearMessages();
  }, [clearMessages]);

  const setConfirmPassword = useCallback((newPassword: string) => {
    setConfirmPasswordState(newPassword);
    clearMessages();
  }, [clearMessages]);

  // Fazer registro
  const handleRegister = useCallback(async (
    onSuccess: () => void
  ) => {
    if (!isFormValid) {
      return;
    }

    const result = await registerService(
      name.trim(),
      email.trim().toLowerCase(),
      password
    );
    
    if (result) {
      setSuccess('Registro bem-sucedido! Redirecionando para o login...');
      
      // Delay para mostrar mensagem de sucesso
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  }, [name, email, password, isFormValid, registerService]);

  return {
    name,
    email,
    password,
    confirmPassword,
    error: error ? error.message : null,
    success,
    loading,
    isFormValid,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleRegister,
    clearMessages,
  };
};
