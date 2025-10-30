import React from 'react';
import { useNewGame } from '../../../hooks/screen/menu/useNewGame';

import * as S from './save.styles';

interface NewGameProps {
  onStartNewGame: (difficulty: 'facil' | 'medio' | 'dificil', withTutorial: boolean) => void;
}

const NewGame: React.FC<NewGameProps> = ({ onStartNewGame }) => {
  const {
    selectedDifficulty,
    withTutorial,
    loading,
    error,
    formValid,
    setDifficulty,
    setWithTutorial,
    startNewGameCreate,
  } = useNewGame();

  const difficultyOptions = [
    { 
      value: 'facil' as const, 
      label: 'FÁCIL', 
      description: 'Perguntas mais simples e mais tempo para responder',
      icon: '🟢'
    },
    { 
      value: 'medio' as const, 
      label: 'MÉDIO', 
      description: 'Dificuldade equilibrada para iniciantes',
      icon: '🟡'
    },
    { 
      value: 'dificil' as const, 
      label: 'DIFÍCIL', 
      description: 'Desafio máximo para jogadores experientes',
      icon: '🔴'
    },
  ];

  const tutorialOptions = [
    { 
      value: true, 
      label: 'INICIAR COM TUTORIAL', 
      description: 'Aprenda os controles e mecânicas básicas',
      icon: '📚'
    },
    { 
      value: false, 
      label: 'PULAR TUTORIAL', 
      description: 'Ir direto para a aventura',
      icon: '⚡'
    },
  ];

  const handleStartGame = async () => {
    await startNewGameCreate((characterId) => {
      console.log('✅ Personagem criado:', characterId);
      console.log('🎮 Configurações:', { 
        selectedDifficulty, 
        withTutorial,
      });
      
      if (selectedDifficulty && withTutorial) {
        onStartNewGame(selectedDifficulty, withTutorial);
        
      }
    });
  };

  return (
    <S.PanelContainer>
      <S.OptionGroup>
        <S.ContentTitle>DIFICULDADE</S.ContentTitle>
        <S.OptionDescription>
          Escolha o nível de desafio para suas aventuras
        </S.OptionDescription>

        <S.HorizontalButtonsWrapper>
          {difficultyOptions.map(({ value, label, description, icon }) => (
            <S.OptionButton
              key={value}
              $isActive={selectedDifficulty === value}
              onClick={() => setDifficulty(value)}
              title={description}
            >
              <span>{icon}</span>
              {label}
            </S.OptionButton>
          ))}
        </S.HorizontalButtonsWrapper>
      </S.OptionGroup>

      <S.OptionGroup>
        <S.ContentTitle>TUTORIAL</S.ContentTitle>
        <S.OptionDescription>
          Deseja aprender como jogar antes de começar?
        </S.OptionDescription>

        <S.HorizontalButtonsWrapper>
          {tutorialOptions.map(({ value, label, description, icon }) => (
            <S.OptionButton
              key={String(value)}
              $isActive={withTutorial === value}
              onClick={() => setWithTutorial(value)}
              title={description}
            >
              <span>{icon}</span>
              {label}
            </S.OptionButton>
          ))}
        </S.HorizontalButtonsWrapper>
      </S.OptionGroup>

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

      <S.ConfirmButtonWrapper>
        <S.ConfirmButton
          onClick={handleStartGame}
          disabled={!formValid || loading}
        >
          {loading ? 'CRIANDO...' : formValid ? 'INICIAR AVENTURA' : 'PREENCHA TODOS OS CAMPOS'}
        </S.ConfirmButton>
      </S.ConfirmButtonWrapper>
    </S.PanelContainer>
  );
};

export default NewGame;
