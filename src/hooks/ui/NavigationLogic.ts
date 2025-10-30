import { useCallback } from 'react';
import { useGame } from '../../contexts/GameContext';



export const NavigationLogic = () => {
  const { setGameState } = useGame();

 const startNewGame = useCallback(() => {
    console.log('🎮 Iniciando novo jogo');
    setGameState('CLASS_SELECTION');
  }, [setGameState]);

  return {
     startNewGame,
  };
};