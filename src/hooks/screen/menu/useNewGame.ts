import react, { useCallback } from 'react';

import { useGame, type Difficulty} from '../../../contexts/GameContext';


interface UseNewGameReturn {
  // Estados do formulário
  selectedDifficulty: Difficulty | null;
  withTutorial: boolean | null;
  error: string | null;
  loading: boolean;
  formValid: boolean;
  // Ações
  setDifficulty: (difficulty: Difficulty) => void;
  setWithTutorial: (withTutorial: boolean) => void;
  startNewGameCreate: (onSuccess: (characterId: number) => void) => Promise<void>;
  clearError: () => void;
}

/**
 * Hook específico para a tela de Novo Jogo
 * 
 * Gerencia configurações iniciais e criação de personagem
 * 
 * @example
 * ```tsx
 * const NewGamePanel = () => {
 *   const {
 *     selectedDifficulty,
 *     withTutorial,
 *     formValid,
 *     setDifficulty,
 *     setWithTutorial,
 *     startNewGame,
 *   } = useNewGame();
 * 
 *   const handleStart = async () => {
 *     await startNewGame((characterId) => {
 *       // Iniciar jogo com o personagem criado
 *       console.log('Personagem criado:', characterId);
 *     });
 *   };
 * };
 * ```
 */
export const useNewGame = (): UseNewGameReturn => {
  const {
    difficulty,
    setDifficulty,
    tutorial,
    setTutorial,
    goToClassSelection,
  } = useGame();

  const [error, setError] = react.useState<string | null>(null);
  const loading = false;

  // Validação do formulário
  const formValid = difficulty !== null && tutorial !== null;

  // Limpar erro
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Setters para difficulty e tutorial que atualizam o contexto
  const setDifficultyContext = useCallback((difficultyValue: Difficulty) => {
    setDifficulty(difficultyValue);
    clearError();
  }, [setDifficulty, clearError]);

  const setTutorialContext = useCallback((tutorialValue: boolean) => {
    setTutorial(tutorialValue);
    clearError();
  }, [setTutorial, clearError]);

  // Iniciar novo jogo: apenas salva configs e navega para seleção de classe
  const startNewGameCreate = useCallback(async (
    onSuccess: (characterId: number) => void
  ) => {
    if (!formValid) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }
    localStorage.setItem('gameDifficulty', difficulty!);
    localStorage.setItem('withTutorial', String(tutorial));
    goToClassSelection();
    onSuccess(0);
  }, [formValid, difficulty, tutorial, goToClassSelection]);

  return {
    selectedDifficulty: difficulty,
    withTutorial: tutorial,
    error,
    loading,
    formValid,
    setDifficulty: setDifficultyContext,
    setWithTutorial: setTutorialContext,
    startNewGameCreate,
    clearError,
  };
};
