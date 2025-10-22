import React from 'react';
import { useRegister } from './useRegister';
import * as S from '../User.styles';

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onGoToLogin: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegisterSuccess, onGoToLogin }) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    error,
    success,
    loading,
    isFormValid,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleRegister,
  } = useRegister();

  const handleRegisterForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleRegister(onRegisterSuccess);
  };

  return (
    <S.Container>
      <S.FormWrapper>
        <S.Title>REGISTRAR</S.Title>
        
        <S.Form onSubmit={handleRegisterForm}>
          <S.InputGroup>
            <label htmlFor="name">Nome de Usuário</label>
            <S.Input 
              id="name" 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
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
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua senha"
              autoComplete="new-password"
              required 
              minLength={6}
            />
          </S.InputGroup>

          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          {success && <S.SuccessMessage>{success}</S.SuccessMessage>}

          <S.SubmitButton 
            type="submit" 
            disabled={loading || !isFormValid}
          >
            {loading ? 'CRIANDO...' : 'CRIAR CONTA'}
          </S.SubmitButton>
        </S.Form>

        <S.SecondaryButton onClick={onGoToLogin} disabled={loading}>
          Já tem uma conta? Faça Login
        </S.SecondaryButton>
      </S.FormWrapper>
    </S.Container>
  );
};

export default RegisterScreen;