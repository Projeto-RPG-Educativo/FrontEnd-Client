import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Player, Monster, ClassName, BattleStateResponse, Question, QuestionDifficulty } from '../types';

export type Difficulty = QuestionDifficulty;

export type GameState = 
  | 'INTRO'
  | 'MENU'
  | 'CLASS_SELECTION'
  | 'LOADING'
  | 'HUB'
  | 'BATTLE'
  | 'QUIZ'
  | 'TUTORIAL'
  | 'DIALOGUE'
;

export type HubState =
  | 'CENTRAL'
  | 'TOWER'
  | 'ARENA'
  | 'LIBRARY'
  | 'SHOP'
  | 'INN'
  | 'EXIT'
;

interface GameContextType {
  // === ESTADOS PRINCIPAIS ===
  gameState: GameState;
  setGameState: (state: GameState) => void;
  difficulty: QuestionDifficulty | null;
  setDifficulty: (difficulty: QuestionDifficulty | null) => void;
  tutorial: boolean | null;
  setTutorial: (tutorial: boolean | null) => void;
  player: Player | null;
  setPlayer: (player: Player | null) => void;
  class: ClassName | null;
  setClass: (classe: ClassName | null) => void;
  enemy: Monster | null ;
  setEnemy: (enemy: Monster | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  hubState: HubState;
  setHubState: (state: HubState) => void;
  battleState: BattleStateResponse | null;
  setBattleState: (state: BattleStateResponse | null) => void;
  battleId: Number | null;
  setBattleId: (id: Number | null) => void;
  showQuiz: boolean;
  setShowQuiz: (show: boolean) => void;
  currentQuestion: Question | null;
  setCurrentQuestion: (question: Question | null) => void;
  gameMessage: string | null;
  setGameMessage: (message: string | null) => void;
  resetGameConfig: () => void;

  // === FUNÇÕES DE NAVEGAÇÃO ===
  goToMenu: () => void;
  goToHub: () => void;
  goToBattle: () => void;
  goToClassSelection: () => void;
  goToQuiz: () => void;
  goToHubZone: (zone: HubState) => void;
  goToTutorial: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext deve ser usado dentro de um GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estados principais
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [difficulty, setDifficulty] = useState<QuestionDifficulty | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [className, setClassName] = useState<ClassName | null>(null);
  const [enemy, setEnemy] = useState<Monster | null >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hubState, setHubState] = useState<HubState>('CENTRAL');
  const [tutorial, setTutorial] = useState<boolean | null>(null);
  const [battleState, setBattleState] = useState<BattleStateResponse | null>(null);
  const [battleId, setBattleId] = useState<Number | null>(null);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [gameMessage, setGameMessage] = useState<string | null>(null);

  // Funções de navegação
  const goToMenu = () => setGameState('MENU');
  const goToHub = () => setGameState('HUB');
  const goToBattle = () => setGameState('BATTLE');
  const goToClassSelection = () => setGameState('CLASS_SELECTION');
  const goToQuiz = () => setGameState('QUIZ');
  const goToTutorial = () => setGameState('TUTORIAL');
  const goToHubZone = (zone: HubState) => setHubState(zone);

  const resetGameConfig = () => {
  setDifficulty(null);
  setTutorial(null);
  // Resete outros estados se necessário
};

  const value: GameContextType = {
    gameState,
    setGameState,
    difficulty,
    setDifficulty,
    tutorial,
    setTutorial,
    player,
    setPlayer,
    class: className,
    setClass: setClassName,
    enemy,
    setEnemy,
    isLoading,
    setIsLoading,
    hubState,
    setHubState,
    battleState,
    setBattleState,
    battleId,
    setBattleId,
    showQuiz,
    setShowQuiz,
    currentQuestion,
    setCurrentQuestion,
    gameMessage,
    setGameMessage,

    // Funções
    goToMenu,
    goToHub,
    goToBattle,
    goToClassSelection,
    goToHubZone,
    goToQuiz,
    goToTutorial,
    resetGameConfig,

  };
    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};


