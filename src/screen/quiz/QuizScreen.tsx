import React, { useState, useEffect } from 'react';
import { type Question } from '../../types';
import * as S from './QuizScreen.style';

interface QuizScreenProps {
  currentQuestion: Question | null;
  gameMessage: string | null;
  onAnswer: (selectedOption: string) => void;
  onCloseQuiz: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({
  currentQuestion,
  gameMessage,
  onAnswer,
  onCloseQuiz,
}) => {
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (currentQuestion) {
      setIsAnswered(false);
    }
  }, [currentQuestion]);

  const handleAnswerClick = (option: string) => {
    if (isAnswered) return; 
    
    setIsAnswered(true);
    console.log('📝 Resposta selecionada:', option);
    onAnswer(option);
  };

  return (
    <S.QuizScreenOverlay>
      <S.QuizContainer>
        <S.QuizTitle>⚔️ Desafio de Conhecimento ⚔️</S.QuizTitle>

        {/* Caixa de Pergunta */}
        <S.QuestionBox>
          <p>{currentQuestion?.text || 'Carregando pergunta...'}</p>
        </S.QuestionBox>

        {/* Mensagem de feedback (vindo do GameContext) */}
        {gameMessage && (
          <S.GameMessageQuiz>{gameMessage}</S.GameMessageQuiz>
        )}

        {/* Opções de resposta */}
        <S.OptionsContainer>
          {(currentQuestion?.options || []).map((option, index) => (
            <S.OptionButton
              key={index}
              onClick={() => handleAnswerClick(option)}
              // Desabilita se a pergunta não estiver carregada OU se já foi respondida
              disabled={!currentQuestion || isAnswered}
            >
              {option}
            </S.OptionButton>
          ))}
        </S.OptionsContainer>
        
        <S.CloseQuizButton onClick={onCloseQuiz} disabled={isAnswered}>
          Fechar
        </S.CloseQuizButton>
       
        
      </S.QuizContainer>
    </S.QuizScreenOverlay>
  );
};

export default QuizScreen;