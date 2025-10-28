import { useState, useCallback } from 'react';
import { useBattle as useBattleService } from '../../services/useBattle';
import { useQuestion } from '../../services/useQuestion';
import type { BattleStateResponse, BattleActionRequest } from '../../../types';
import type { Question } from '../../../types';
import type { Player, Monster } from '../../../types';
import { useGame } from '../../../contexts/GameContext';

interface UseBattleReturn {
  // Estado da batalha
  battleState: BattleStateResponse  | null;
  player: Player | null;
  monster: Monster | null;
  gameMessage: string | null;
  currentQuestion: Question | null;
  showQuiz: boolean;
  loading: boolean;
  error: string | null;

  // Ações de batalha
  startBattle: (monsterId: number, difficulty: 'facil' | 'medio' | 'dificil') => Promise<void>;
  executeBattleAction: (action: BattleActionRequest) => Promise<void>;
  answerQuestion: (answer: string) => Promise<void>;
  openQuiz: () => Promise<void>;
  closeQuiz: () => void;
  saveBattleProgress: () => Promise<void>;
}


/**
 * Hook específico para a tela de Batalha
 * 
 * Gerencia todo o fluxo de batalha: início, ações, perguntas e progresso
 * 
 * @example
 * ```tsx
 * const BattleScreen = () => {
 *   const {
 *     player,
 *     enemy,
 *     gameMessage,
 *     currentQuestion,
 *     showQuiz,
 *     executeBattleAction,
 *     answerQuestion,
 *     openQuiz,
 *   } = useBattleScreen();
 * 
 *   const handleAttack = () => {
 *     executeBattleAction('ATTACK');
 *   };
 * };
 * ```
 */
export const useBattleScreen = (): UseBattleReturn => {
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const { player, setPlayer, enemy, setEnemy, battleState, setBattleState } = useGame();
  const {
    startBattle: startBattleService,
    executeAction,
    saveProgress,
    loading: loadingBattle,
    error: errorBattle,
  } = useBattleService();

  const {
    fetchRandomQuestion,
    submitAnswer: submitAnswerService,
    loading: loadingQuestion,
    error: errorQuestion,
  } = useQuestion();

  const loading = loadingBattle || loadingQuestion;
  const error = errorBattle || errorQuestion;

  // Atualizar estado da batalha
  const updateBattleState = useCallback((newBattleState: BattleStateResponse) => {
    setBattleState(newBattleState);
    if (newBattleState.character) {
      const mappedPlayer: Player = {
        ...newBattleState.character,
        nome: (newBattleState.character as any).nome ?? '',
        stamina: (newBattleState.character as any).energy ?? 0,
        maxStamina: (newBattleState.character as any).maxEnergy ?? 0,
        gold: (newBattleState.character as any).gold ?? 0,
        lastSavedAt: (newBattleState.character as any).lastSavedAt ?? '',
        className: (newBattleState.character as any).className as import('../../../types').ClassName,
      };
      setPlayer(mappedPlayer);
    }
    if (newBattleState.monster) {
      const mappedMonster: Monster = {
        ...newBattleState.monster,
        name: (newBattleState.monster as any).nome ?? '',
        damage: (newBattleState.monster as any).dano ?? 0,
      };
      setEnemy(mappedMonster);
    }

    // Atualizar mensagem
    if (newBattleState.message) {
      setGameMessage(newBattleState.message);
    }

    // Verificar fim de batalha
    if (newBattleState.isFinished) {
      const vencedor = newBattleState.winner === 'character' ? 'Você venceu!' : 'Você foi derrotado!';
      setGameMessage(vencedor);
    }
  }, [setPlayer, setEnemy]);

  // Iniciar batalha
  const startBattle = useCallback(async (
    monsterId: number,
    difficulty: 'facil' | 'medio' | 'dificil' = 'facil'
  ) => {
    console.log('🎮 [useBattleScreen] Iniciando batalha com monsterId:', monsterId, 'difficulty:', difficulty);
    try {
      const result = await startBattleService({ monsterId: Number(monsterId), difficulty });
      if (result) {
        console.log('✅ [useBattleScreen] Batalha iniciada com sucesso:', result);
        updateBattleState(result);
      } else {
        console.error('❌ [useBattleScreen] Resultado da batalha está vazio');
      }
    } catch (error) {
      console.error('❌ [useBattleScreen] Erro ao iniciar batalha:', error);
    }
  }, [startBattleService, updateBattleState]);


  // Executar ação de batalha
  const executeBattleAction = useCallback(async (action: BattleActionRequest) => {

    if (!battleState || !battleState.battleId) {
      console.error('Batalha não iniciada');
      return;
    }
    const req = {
      battleId: battleState.battleId,
      action,
    };
    const result = await executeAction(req);
    if (result) {
      updateBattleState(result);
    }
  }, [battleState, executeAction, updateBattleState]);

  // Abrir quiz (buscar pergunta aleatória)
  const openQuiz = useCallback(async () => {
    const question = await fetchRandomQuestion();

    if (question) {
      const mappedQuestion: Question = {
        id: question.id,
        text: question.text,
        options: question.options,
        correctAnswer: question.correctAnswer,
        difficulty: question.difficulty,
        category: question.category,
        points: question.points,
      };
      setCurrentQuestion(mappedQuestion);
      setShowQuiz(true);
    }
  }, [fetchRandomQuestion]);

  // Fechar quiz
  const closeQuiz = useCallback(() => {
    setShowQuiz(false);
    setCurrentQuestion(null);
  }, []);

  // Responder pergunta
  const answerQuestion = useCallback(async (answer: string) => {
    if (!battleState?.battleId || !currentQuestion) {
      console.error('Batalha ou pergunta não disponível');
      return;
    }

    const result = await submitAnswerService(
      String(battleState.battleId),
      String(currentQuestion.id),
      Number(answer)
    );

    if (result) {
      // Atualizar mensagem com feedback
      const mensagem = result.isCorrect
        ? '✅ Resposta correta! +Dano extra!'
        : '❌ Resposta incorreta! Dano reduzido.';

      setGameMessage(mensagem);

      // Atualizar estado da batalha se houver
      // if (resultado.battleState) {
      //   updateBattleState(resultado.battleState);
      // }

      // Fechar quiz após resposta
      setTimeout(() => {
        closeQuiz();
      }, 2000);
    }
  }, [battleState?.battleId, currentQuestion, submitAnswerService, updateBattleState, closeQuiz]);

  // Salvar progresso da batalha
  const saveBattleProgress = useCallback(async () => {
    if (!battleState?.battleId) {
      console.error('Batalha não iniciada');
      return;
    }

    await saveProgress({
      battleId: battleState.battleId,
      characterId: String(battleState.character?.id),
      battleState: battleState,
    });
  }, [battleState?.battleId, saveProgress]);

  return {
    battleState,
    player,
    monster: enemy,
    gameMessage,
    currentQuestion,
    showQuiz,
    loading,
    error: error ? error.message : null,
    startBattle,
    executeBattleAction,
    answerQuestion,
    openQuiz,
    closeQuiz,
    saveBattleProgress,
  };
};
