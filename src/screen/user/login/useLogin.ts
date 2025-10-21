import { useState, useCallback } from 'react';
import { useAuth } from '../../../services/auth/useAuth';

interface UseLoginReturn {
  // Estados do formulário
  usuario: string;
  senha: string;
  erro: string | null;
  carregando: boolean;
  formularioValido: boolean;
  
  // Ações
  setUsuario: (usuario: string) => void;
  setSenha: (senha: string) => void;
  fazerLogin: (onSuccess: (token: string, user: any) => void) => Promise<void>;
  limparErro: () => void;
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
 *     usuario,
 *     senha,
 *     erro,
 *     carregando,
 *     formularioValido,
 *     setUsuario,
 *     setSenha,
 *     fazerLogin,
 *   } = useLoginScreen();
 * 
 *   const handleSubmit = async (e: React.FormEvent) => {
 *     e.preventDefault();
 *     await fazerLogin((token, user) => {
 *       // Redirecionar para o jogo
 *     });
 *   };
 * };
 * ```
 */
export const useLogin = (): UseLoginReturn => {
  const [usuario, setUsuarioState] = useState('');
  const [senha, setSenhaState] = useState('');
  const { fazerLogin: loginService, carregando, erro, limparErro } = useAuth();

  // Validação do formulário
  const formularioValido = usuario.trim().length >= 3 && senha.length >= 6;

  // Setter para usuario que limpa erro
  const setUsuario = useCallback((novoUsuario: string) => {
    setUsuarioState(novoUsuario);
    limparErro();
  }, [limparErro]);

  // Setter para senha que limpa erro
  const setSenha = useCallback((novaSenha: string) => {
    setSenhaState(novaSenha);
    limparErro();
  }, [limparErro]);

  // Fazer login
  const fazerLogin = useCallback(async (
    onSuccess: (token: string, user: any) => void
  ) => {
    if (!formularioValido) {
      return;
    }

    const resultado = await loginService(usuario.trim(), senha);
    
    if (resultado) {
      onSuccess(resultado.token, resultado.user);
    }
  }, [usuario, senha, formularioValido, loginService]);

  return {
    usuario,
    senha,
    erro: erro ? erro.message : null,
    carregando,
    formularioValido,
    setUsuario,
    setSenha,
    fazerLogin,
    limparErro,
  };
};
