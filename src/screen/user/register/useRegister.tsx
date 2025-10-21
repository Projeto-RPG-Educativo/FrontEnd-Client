import { useState, useCallback } from 'react';
import { useAuth } from '../../../services/auth/useAuth';

interface UseRegisterReturn {
  // Estados do formulário
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  erro: string | null;
  sucesso: string | null;
  carregando: boolean;
  formularioValido: boolean;
  
  // Ações
  setNome: (nome: string) => void;
  setEmail: (email: string) => void;
  setSenha: (senha: string) => void;
  setConfirmarSenha: (senha: string) => void;
  fazerRegistro: (onSuccess: () => void) => Promise<void>;
  limparMensagens: () => void;
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
 *     nome,
 *     email,
 *     senha,
 *     confirmarSenha,
 *     erro,
 *     sucesso,
 *     carregando,
 *     formularioValido,
 *     setNome,
 *     setEmail,
 *     setSenha,
 *     setConfirmarSenha,
 *     fazerRegistro,
 *   } = useRegisterScreen();
 * 
 *   const handleSubmit = async (e: React.FormEvent) => {
 *     e.preventDefault();
 *     await fazerRegistro(() => {
 *       // Redirecionar para login
 *     });
 *   };
 * };
 * ```
 */
export const useRegister = (): UseRegisterReturn => {
  const [nome, setNomeState] = useState('');
  const [email, setEmailState] = useState('');
  const [senha, setSenhaState] = useState('');
  const [confirmarSenha, setConfirmarSenhaState] = useState('');
  const [sucesso, setSucesso] = useState<string | null>(null);
  
  const { fazerRegistro: registerService, carregando, erro, limparErro } = useAuth();

  // Validação do formulário
  const formularioValido = 
    nome.trim().length >= 3 &&
    email.includes('@') &&
    senha.length >= 6 &&
    senha === confirmarSenha;

  // Limpa mensagens de erro e sucesso
  const limparMensagens = useCallback(() => {
    limparErro();
    setSucesso(null);
  }, [limparErro]);

  // Setters que limpam mensagens
  const setNome = useCallback((novoNome: string) => {
    setNomeState(novoNome);
    limparMensagens();
  }, [limparMensagens]);

  const setEmail = useCallback((novoEmail: string) => {
    setEmailState(novoEmail);
    limparMensagens();
  }, [limparMensagens]);

  const setSenha = useCallback((novaSenha: string) => {
    setSenhaState(novaSenha);
    limparMensagens();
  }, [limparMensagens]);

  const setConfirmarSenha = useCallback((novaSenha: string) => {
    setConfirmarSenhaState(novaSenha);
    limparMensagens();
  }, [limparMensagens]);

  // Fazer registro
  const fazerRegistro = useCallback(async (
    onSuccess: () => void
  ) => {
    if (!formularioValido) {
      return;
    }

    const resultado = await registerService(
      nome.trim(),
      email.trim().toLowerCase(),
      senha
    );
    
    if (resultado) {
      setSucesso('Registro bem-sucedido! Redirecionando para o login...');
      
      // Delay para mostrar mensagem de sucesso
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  }, [nome, email, senha, formularioValido, registerService]);

  return {
    nome,
    email,
    senha,
    confirmarSenha,
    erro: erro ? erro.message : null,
    sucesso,
    carregando,
    formularioValido,
    setNome,
    setEmail,
    setSenha,
    setConfirmarSenha,
    fazerRegistro,
    limparMensagens,
  };
};
