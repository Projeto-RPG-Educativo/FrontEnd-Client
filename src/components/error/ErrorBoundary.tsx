import { Component, type ErrorInfo, type ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // A propriedade opcional para uma UI de fallback customizada
}

interface State {
  hasError: boolean;
}

const ErrorWrapper = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #3e2723;
  color: #fff;
  font-family: 'Press Start 2P', cursive;
  border: 2px solid #d40707;
  border-radius: 10px;

  h1 {
    font-size: 1.5em;
  }
`;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  // Este método é chamado quando um erro é lançado em um componente filho
  public static getDerivedStateFromError(_: Error): State {
    // Atualiza o estado para que a próxima renderização exiba a UI de fallback
    return { hasError: true };
  }

  // Este método é chamado para registrar o erro
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // Aqui você pode enviar o erro para um serviço de log de erros (ex: Sentry, Bugsnag)
  }

  public render() {
    if (this.state.hasError) {
      // Você pode renderizar uma UI de fallback customizada
      return (

       <ErrorWrapper>
          <h1>Ops... Ocorreu um erro.</h1>
          <p>Por favor, tente recarregar a página.</p>
        </ErrorWrapper>

      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;