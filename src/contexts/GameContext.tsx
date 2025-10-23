import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Player } from '../types';

export type GameState = 
  | 'MENU'
  | 'CLASS_SELECTION'
  | 'HUB'
;

export type HubState =
  | 'CENTRAL'
  | 'TOWER'
  | 'ARENA'
  | 'LIBRARY'
  | 'SHOP'
  | 'INN'
;



export type Difficulty = 'facil' | 'medio' | 'dificil';

interface GameContextType {
  // === ESTADOS PRINCIPAIS ===
  gameState: GameState;
  setGameState: (state: GameState) => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  player: Player | null;
  setPlayer: (player: Player | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  hubState: HubState;
  setHubState: (state: HubState) => void;
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
  const [player, setPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hubState, setHubState] = useState<HubState>('CENTRAL');

  const value: GameContextType = {
    gameState,
    setGameState,
    difficulty,
    setDifficulty,
    player,
    setPlayer,
    isLoading,
    setIsLoading,
    hubState,
    setHubState,
  };
    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};


