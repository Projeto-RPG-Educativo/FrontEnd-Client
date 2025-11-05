import { useGame } from '../../../contexts/GameContext';

export const useMenuScreen = () => {
  const {
    setDifficulty,
    setGameState,
    setTutorial,
    difficulty,
    tutorial,
  } = useGame();


  const handleStartNewGame = (difficulty: 'facil' | 'medio' | 'dificil', tutorial: boolean) => {
    setDifficulty(difficulty);
    setTutorial(tutorial);
    setGameState('CLASS_SELECTION');
    console.log(`Menu: Dificuldade: ${difficulty}, Tutorial: ${tutorial}`);
  };

  return {
    handleStartNewGame,
    difficulty,
    tutorial,
  };
};