import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

import {Login, Register} from '../../index';

/**
 * AuthScreen: Componente orquestrador das telas de autenticação.
 * Gerencia a navegação entre login e registro.
 */
const Auth: React.FC = () => {
  const { login } = useContext(AuthContext);
  
  // Controla qual tela está visível: false = Login, true = Registro
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Handlers para melhor organização
  const handleSwitchToLogin = () => setIsRegistering(false);
  const handleSwitchToRegister = () => setIsRegistering(true);

  // Renderização condicional baseada no estado
  if (isRegistering) {
    return (
      <Register
        onRegisterSuccess={handleSwitchToLogin}
        onGoToLogin={handleSwitchToLogin}
      />
    );
  }

  return (
    <Login
      onLoginSuccess={login}
      onGoToRegister={handleSwitchToRegister}
    />
  );
};

export default Auth;