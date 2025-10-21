import React from 'react';
import { useLogin } from './useLogin';
import * as S from '../User.styles'

interface LoginScreenProps {
  onLoginSuccess: (token: string, user: any) => void;
  onGoToRegister: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onGoToRegister }) => {
  const {
    usuario,
    senha,
    erro,
    carregando,
    formularioValido,
    setUsuario,
    setSenha,
    fazerLogin,
  } = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await fazerLogin(onLoginSuccess);
  };

  return (
    <S.Container>
      <S.FormWrapper>
        <S.Title>LOGIN</S.Title>

        <S.Form onSubmit={handleLogin}>
          <S.InputGroup>
            <label htmlFor="string">Usuario</label>
            <S.Input
              id="string"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              required
              minLength={6}
            />
          </S.InputGroup>

          {erro && <S.ErrorMessage>{erro}</S.ErrorMessage>}
          
          <S.SubmitButton 
            type="submit" 
            disabled={carregando || !formularioValido}
          >
            {carregando ? 'ENTRANDO...' : 'ENTRAR'}
          </S.SubmitButton>
        </S.Form>

        <S.SecondaryButton onClick={onGoToRegister} disabled={carregando}>
          Ainda não tem conta? Crie uma
        </S.SecondaryButton>
      </S.FormWrapper>
    </S.Container>
  );
};

export default LoginScreen;