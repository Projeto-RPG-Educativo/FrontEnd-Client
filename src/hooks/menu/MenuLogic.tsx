import { useState } from 'react';
import type { GameState } from '../../contexts/GameContext';


interface MenuLogicProps {
  setDifficulty: (difficulty: 'facil' | 'medio' | 'dificil') => void;
  setGameState: (state: GameState) => void;
}

export const MenuLogic = ({ setDifficulty, setGameState }: MenuLogicProps) => {

  // Estado que pertence SOMENTE à lógica de menus
  const [showSettings, setShowSettings] = useState(false);

  // Função para alternar a visibilidade das configurações
  const toggleSettings = () => setShowSettings(prev => !prev);

  // A função que o NewGamePanel chama.
  const handleStartNewGame = (difficulty: 'facil' | 'medio' | 'dificil', withTutorial: boolean) => {
     setDifficulty(difficulty);
    
    // Aqui adicionar a lógica de `withTutorial` 

    
    console.log(`Lógica de Menu: Preparando para iniciar o jogo. Dificuldade: ${difficulty}`);
    setGameState('CLASS_SELECTION'); // Comanda o orquestrador para ir para a próxima tela
  };

  // Retorna apenas o que a view precisa
  return {
    showSettings,
    toggleSettings,
    handleStartNewGame,    
  };
};