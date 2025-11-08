import React, { useState, useEffect } from 'react';
import { type Question } from '../../types';
import { useTutorial } from '../../contexts';
import * as S from './QuizScreen.style';

interface QuizScreenProps {
  currentQuestion: Question | null;
  gameMessage: string | null;
  onAnswer: (selectedOption: string) => void;
  onCloseQuiz: () => void;
  playerEnergy?: number; 
  playerMaxEnergy?: number;
  isLoadingNewQuestion?: boolean;
}

const QuizScreen: React.FC<QuizScreenProps> = ({
  currentQuestion,
  gameMessage,
  onAnswer,
  onCloseQuiz,
  playerEnergy = 0,
  playerMaxEnergy = 12,
  isLoadingNewQuestion = false,
}) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const { isBattleTutorialActive, registerPlayerAction } = useTutorial();

  useEffect(() => {
    if (currentQuestion) {
      setIsAnswered(false);
    }
  }, [currentQuestion]);

  const handleAnswerClick = (option: string) => {
    if (isAnswered || isLoadingNewQuestion) return; 
    
    setIsAnswered(true);
    console.log('📝 Resposta selecionada:', option);
    onAnswer(option);
    
    // Se está no tutorial de batalha, registra a ação ANSWER
    if (isBattleTutorialActive) {
      console.log('🎓 Tutorial: Registrando ação ANSWER');
      registerPlayerAction('ANSWER');
    }
    // NÃO fecha mais automaticamente
  };

  const energyPercentage = (playerEnergy / playerMaxEnergy) * 100;

  return (
    <S.QuizScreenOverlay>
      <S.QuizContainer>
        <S.QuizTitle>⚔️ Desafio de Conhecimento ⚔️</S.QuizTitle>

        {/* Barra de Energia */}
        <S.EnergySection>
          <S.EnergyLabel>
            ⚡ Energia: {playerEnergy} / {playerMaxEnergy}
          </S.EnergyLabel>
          <S.EnergyBarContainer>
            <S.EnergyBar width={`${energyPercentage}%`} />
          </S.EnergyBarContainer>
        </S.EnergySection>

        {/* Caixa de Pergunta */}
        <S.QuestionBox>
          {isLoadingNewQuestion ? (
            <S.LoadingText>🔄 Carregando nova pergunta...</S.LoadingText>
          ) : (
            <p>{currentQuestion?.text || 'Carregando pergunta...'}</p>
          )}
        </S.QuestionBox>

        {/* Mensagem de feedback (vindo do GameContext) */}
        {gameMessage && !isLoadingNewQuestion && (
          <S.GameMessageQuiz>{gameMessage}</S.GameMessageQuiz>
        )}

        {/* Opções de resposta */}
        <S.OptionsContainer>
          {(currentQuestion?.options || []).map((option, index) => (
            <S.OptionButton
              key={index}
              onClick={() => handleAnswerClick(option)}
              // Desabilita se a pergunta não estiver carregada OU se já foi respondida OU se está carregando nova pergunta
              disabled={!currentQuestion || isAnswered || isLoadingNewQuestion}
            >
              {option}
            </S.OptionButton>
          ))}
        </S.OptionsContainer>
        
        <S.CloseQuizButton onClick={onCloseQuiz}>
          {isAnswered ? 'Voltar para Batalha' : 'Cancelar'}
        </S.CloseQuizButton>
       
        
      </S.QuizContainer>
    </S.QuizScreenOverlay>
  );
};

export default QuizScreen;