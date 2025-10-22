import React from 'react';
import { useLogin } from './useLogin';
import * as S from '../User.styles'

interface LoginScreenProps {
  onLoginSuccess: (token: string, user: any) => void;
  onGoToRegister: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onGoToRegister }) => {
  const {
    username,
    password,
    error,
    loading,
    isFormValid,
    setUsername,
    setPassword,
    handleLogin,
  } = useLogin();

  const handleLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(onLoginSuccess);
  };

  return (
    <S.Container>
      <S.FormWrapper>
        <S.Title>LOGIN</S.Title>

        <S.Form onSubmit={handleLoginForm}>
          <S.InputGroup>
            <label htmlFor="string">Usuario</label>
            <S.Input
              id="string"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              autoComplete="username"
              required
              minLength={3}
            />
          </S.InputGroup>

          <S.InputGroup>
            <label htmlFor="password">Senha</label>
            <S.Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              required
              minLength={6}
            />
          </S.InputGroup>

          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          
          <S.SubmitButton 
            type="submit" 
            disabled={loading || !isFormValid}
          >
            {loading ? 'ENTRANDO...' : 'ENTRAR'}
          </S.SubmitButton>
        </S.Form>

        <S.SecondaryButton onClick={onGoToRegister} disabled={loading}>
          Ainda não tem conta? Crie uma
        </S.SecondaryButton>
      </S.FormWrapper>
    </S.Container>
  );
};

export default LoginScreen;