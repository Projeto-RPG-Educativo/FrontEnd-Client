import React, { useContext } from 'react';
import {
  AuthProvider, AuthContext,
  FullscreenProvider
} from '../contexts/index';
import {
  Layout,
  ErrorBoundary,
} from '../components/index';
import { Auth } from '../screen/user/index';


const App: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Auth />;
  }

  return (
    <div>
      <h1>Bem-vindo! Você está logado.</h1>
      <p>Aqui vai o conteúdo principal da aplicação.</p>
    </div>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <FullscreenProvider>
          <Layout>
            <App />
          </Layout>
        </FullscreenProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default AppWrapper;