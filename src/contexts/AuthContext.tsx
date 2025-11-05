import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { UserDto } from '../types/dto/Auth';

// Define todas as informações que nosso contexto vai fornecer
interface AuthContextData {
  isLoggedIn: boolean;
  user: UserDto | null;
  login: (token: string, userData: UserDto) => void;
  logout: () => void;
}

// Cria o Contexto com um valor padrão para autocompletar
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Cria o Componente Provedor que vai "abraçar" nossa aplicação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDto | null>(null);

  // O estado inicial de 'isLoggedIn' verifica se já existe um token no navegador
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('authToken');
    return !!token; // Retorna true se houver token, false se não houver
  });

  // Função para executar quando o login for bem-sucedido
  const login = (token: string, userData: UserDto) => {
    console.log('AuthContext: Login bem-sucedido! Alterando isLoggedIn para true.');
    localStorage.setItem('authToken', token);
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Função para executar o logout
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};