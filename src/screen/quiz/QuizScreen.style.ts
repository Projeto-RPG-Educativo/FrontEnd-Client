import styled from 'styled-components';

// Overlay escuro sobre a tela de batalha
export const QuizScreenOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// Container principal do quiz
export const QuizContainer = styled.div`
  background-color: #3e2723;
  border: 5px solid #5d4037;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.9);
  width: 60%;
  max-width: 800px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: #fff;
  font-family: 'Press Start 2P', cursive;
  animation: slideUp 0.4s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

// Título do quiz
export const QuizTitle = styled.h2`
  font-size: 1.2em;
  color: #ffcc00;
  text-shadow: 2px 2px #000;
  margin: 0 0 10px 0;
  text-align: center;
`;

// Caixa da pergunta
export const QuestionBox = styled.div`
  align-items: center;
  background-color: #444;
  border: 2px solid #5d4037;
  border-radius: 8px;
  display: flex;
  font-size: 1em;
  min-height: 80px;
  justify-content: center;
  padding: 20px;
  width: 90%;
  text-align: center;
  line-height: 1.5;
`;

// Mensagem de feedback (acerto/erro)
export const GameMessageQuiz = styled.div`
  font-size: 0.9em;
  color: #f39c12;
  text-align: center;
  margin-bottom: 15px;
  padding: 10px;
  background-color: rgba(243, 156, 18, 0.2);
  border-radius: 5px;
  animation: pulse 0.5s ease-in-out;

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;

// Container das opções
export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
  max-width: 600px;
`;

// Botão de opção de resposta
export const OptionButton = styled.button`
  white-space: normal;
  height: auto;
  padding: 15px;
  line-height: 1.2;
  background-color: #2e2e2e;
  border: 2px solid #5d4037;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  font-size: 0.7em;
  cursor: pointer;
  color: #fff;
  flex-grow: 1;
  flex-basis: 45%;
  transition: all 0.2s ease;
  font-family: 'Press Start 2P', cursive;

  &:hover:not(:disabled) {
    border-color: #ffcc00;
    box-shadow: 0 0 10px #ffcc00;
    transform: translateY(-2px);
    background-color: #3e3e3e;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #5d4037;
    box-shadow: none;
  }
`;

// Botão de fechar (opcional)
export const CloseQuizButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #d32f2f;
  border: 2px solid #b71c1c;
  border-radius: 8px;
  color: #fff;
  font-size: 0.8em;
  font-family: 'Press Start 2P', cursive;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f44336;
    border-color: #d32f2f;
    box-shadow: 0 0 10px #f44336;
  }
`;