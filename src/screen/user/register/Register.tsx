import React from 'react';
import { useRegister } from './useRegister';
import * as S from '../User.styles';

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onGoToLogin: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegisterSuccess, onGoToLogin }) => {
  const {
    nome,
    email,
    senha,
    confirmarSenha,
    erro,
    sucesso,
    carregando,
    formularioValido,
    setNome,
    setEmail,
    setSenha,
    setConfirmarSenha,
    fazerRegistro,
  } = useRegister();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await fazerRegistro(onRegisterSuccess);
  };

  return (
    <S.Container>
      <S.FormWrapper>
        <S.Title>REGISTRAR</S.Title>
        
        <S.Form onSubmit={handleRegister}>
          <S.InputGroup>
            <label htmlFor="name">Nome de Usuário</label>
            <S.Input 
              id="name" 
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome de usuário"
              autoComplete="username"
              required 
              minLength={3}
            />
          </S.InputGroup>

          <S.InputGroup>
            <label htmlFor="email">E-mail</label>
            <S.Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              autoComplete="email"
              required 
            />
          </S.InputGroup>

          <S.InputGroup>
            <label htmlFor="password">Senha</label>
            <S.Input 
              id="password" 
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha (mín. 6 caracteres)"
              autoComplete="new-password"
              required 
              minLength={6}
            />
          </S.InputGroup>

          <S.InputGroup>
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <S.Input 
              id="confirmPassword" 
              type="password" 
              value={confirmarSenha} 
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirme sua senha"
              autoComplete="new-password"
              required 
              minLength={6}
            />
          </S.InputGroup>

          {erro && <S.ErrorMessage>{erro}</S.ErrorMessage>}
          {sucesso && <S.SuccessMessage>{sucesso}</S.SuccessMessage>}

          <S.SubmitButton 
            type="submit" 
            disabled={carregando || !formularioValido}
          >
            {carregando ? 'CRIANDO...' : 'CRIAR CONTA'}
          </S.SubmitButton>
        </S.Form>

        <S.SecondaryButton onClick={onGoToLogin} disabled={carregando}>
          Já tem uma conta? Faça Login
        </S.SecondaryButton>
      </S.FormWrapper>
    </S.Container>
  );
};

export default RegisterScreen;