import React from 'react';
import { useNewGame } from './useNewGame';
import { NavigationLogic } from '../../../hooks/index';
import * as S from './save.styles';

interface NewGameProps {
  onStartNewGame: (difficulty: 'facil' | 'medio' | 'dificil', withTutorial: boolean) => void;
}

const NewGame: React.FC<NewGameProps> = ({ onStartNewGame }) => {
  const {
    dificuldadeSelecionada,
    comTutorial,
    setDificuldade,
    setComTutorial,
    iniciarNovoJogo,
    formularioValido,
    erro,
    carregando,
  } = useNewGame();


  const { startNewGame } = NavigationLogic();

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
    await iniciarNovoJogo((characterId) => {
      console.log('✅ Personagem criado:', characterId);
      console.log('🎮 Configurações:', { 
        dificuldade: dificuldadeSelecionada, 
        tutorial: comTutorial 
      });
      
      // Chama a função passada como prop com as configurações selecionadas
      if (dificuldadeSelecionada && comTutorial) {
        onStartNewGame(dificuldadeSelecionada, comTutorial);
      }
      
      // Inicia o jogo após criar personagem
      startNewGame();
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
              $isActive={dificuldadeSelecionada === value}
              onClick={() => setDificuldade(value)}
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
              $isActive={comTutorial === value}
              onClick={() => setComTutorial(value)}
              title={description}
            >
              <span>{icon}</span>
              {label}
            </S.OptionButton>
          ))}
        </S.HorizontalButtonsWrapper>
      </S.OptionGroup>

      {erro && <S.ErrorMessage>{erro}</S.ErrorMessage>}

      <S.ConfirmButtonWrapper>
        <S.ConfirmButton
          onClick={handleStartGame}
          disabled={!formularioValido || carregando}
        >
          {carregando ? 'CRIANDO...' : formularioValido ? 'INICIAR AVENTURA' : 'PREENCHA TODOS OS CAMPOS'}
        </S.ConfirmButton>
      </S.ConfirmButtonWrapper>
    </S.PanelContainer>
  );
};

export default NewGame;
