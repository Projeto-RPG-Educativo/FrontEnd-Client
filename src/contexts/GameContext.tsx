import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type GameState = 
  | 'MENU'
  | 'CLASS_SELECTION' 
;

export type Difficulty = 'facil' | 'medio' | 'dificil';

interface GameContextType {
  // === ESTADOS PRINCIPAIS ===
  gameState: GameState;
  setGameState: (state: GameState) => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
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
  const [difficulty, setDifficulty] = useState<Difficulty>('facil');

  const value: GameContextType = {
    gameState,
    setGameState,
    difficulty,
    setDifficulty,
  };
    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};


