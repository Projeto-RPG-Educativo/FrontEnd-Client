import { useCallback } from 'react';
import { useBattle as useBattleService } from '../../services/useBattle';
import { useQuestion } from '../../services/useQuestion';
import type {
  BattleStateResponse,
  BattleActionRequest,
  SubmitAnswerRequest,
} from '../../../types';
import type { Question, QuestionFromBackend, Player, Monster } from '../../../types';
import { useGame } from '../../../contexts/GameContext';

interface UseBattleReturn {
  // Estado da batalha
  battleState: BattleStateResponse | null;
  player: Player | null;
  monster: Monster | null;
  gameMessage: string | null;
  currentQuestion: Question | null;
  showQuiz: boolean;
  loading: boolean;
  error: string | null;

  // Ações de batalha
  startBattle: (
    monsterId: number,
    difficulty: 'facil' | 'medio' | 'dificil'
  ) => Promise<void>;
  executeBattleAction: (action: BattleActionRequest) => Promise<void>;
  answerQuestion: (answer: string) => Promise<void>;
  openQuiz: () => Promise<void>;
  closeQuiz: () => void;
  saveBattleProgress: () => Promise<void>;
  submitAnswer: (data: SubmitAnswerRequest) => Promise<BattleStateResponse | null>;
}


export const useBattleScreen = (): UseBattleReturn => {
  const {
    player,
    setPlayer,
    enemy,
    setEnemy,
    battleState,
    setBattleState,
    showQuiz,
    setShowQuiz,
    currentQuestion,
    setCurrentQuestion,
    gameMessage,
    setGameMessage,
    gameState,
    setGameState,
  } = useGame();

  const {
    startBattle: startBattleService,
    executeAction,
    submitAnswer,
    saveProgress,
    loading: loadingBattle,
    error: errorBattle,
  } = useBattleService();


  const {
    fetchRandomQuestion,
    loading: loadingQuestion,
    error: errorQuestion,
  } = useQuestion();

  const loading = loadingBattle || loadingQuestion;
  const error = errorBattle?.message || errorQuestion?.message || null;

  // Atualizar estado da batalha
  const updateBattleState = useCallback(
    (newBattleState: BattleStateResponse) => {
      setBattleState(newBattleState); 
      if (newBattleState.character) {
        const mappedPlayer: Player = {
          ...newBattleState.character,
          nome: (newBattleState.character as any).nome ?? '',
          stamina: (newBattleState.character as any).energy ?? 0,
          maxStamina: (newBattleState.character as any).maxEnergy ?? 0,
          maxHp: (newBattleState.character as any).maxHp ?? 0,
          gold: (newBattleState.character as any).gold ?? 0,
          lastSavedAt: (newBattleState.character as any).lastSavedAt ?? '',
          className: (newBattleState.character as any)
          .className as import('../../../types').ClassName,
        };
        setPlayer(mappedPlayer); 
      }
      if (newBattleState.monster) {
        const mappedMonster: Monster = {
          ...newBattleState.monster,
          maxHp: (newBattleState.monster as any).maxHp ?? 0,
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
        const vencedor =
          newBattleState.winner === 'character'
            ? 'Você venceu!'
            : 'Você foi derrotado!';
        setGameMessage(vencedor);
      }
    },
    [setBattleState, setPlayer, setEnemy, setGameMessage] 
  );

  // Iniciar batalha
  const startBattle = useCallback(
    async (
      monsterId: number,
      difficulty: 'facil' | 'medio' | 'dificil' = 'facil'
    ) => {
      console.log(
        '🎮 [useBattleScreen] Iniciando batalha com monsterId:',
        monsterId,
        'difficulty:',
        difficulty
      );
      try {
        const result = await startBattleService({
          monsterId: Number(monsterId),
          difficulty,
        });
        if (result) {
          console.log('✅ [useBattleScreen] Batalha iniciada com sucesso:', result);
          updateBattleState(result); // <-- Atualiza o context
        } else {
          console.error('❌ [useBattleScreen] Resultado da batalha está vazio');
        }
      } catch (error) {
        console.error('❌ [useBattleScreen] Erro ao iniciar batalha:', error);
      }
    },
    [startBattleService, updateBattleState]
  );

  // Executar ação de batalha
  const executeBattleAction = useCallback(
    async (action: BattleActionRequest) => {
      if (!battleState || !battleState.battleId) {
        console.error('Batalha não iniciada');
        return;
      }
      const result = await executeAction(action);
      if (result) {
        updateBattleState(result); 
      }
    },
    [battleState, executeAction, updateBattleState]
  );

  const openQuiz = useCallback(async () => {
    if (!battleState || !player) {
      console.error(
        '❌ [useBattleScreen] Estado de batalha ou jogador não disponível para buscar pergunta.'
      );
      return;
    }

    const requestData = {
      difficulty: battleState.difficulty,
      playerLevel: player.level ?? 1, 
    };

    console.log('📚 [useBattleScreen] Buscando pergunta com dados:', requestData);
    const question: QuestionFromBackend | null =
      await fetchRandomQuestion(requestData);
    console.log('[useBattleScreen] Resposta da pergunta recebida:', question);
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
      setGameState('QUIZ'); 
      console.log(gameState);
    }
  }, [
    fetchRandomQuestion,
    battleState,
    player,
    setCurrentQuestion,
    setShowQuiz,
    setGameState, 
  ]);

  const closeQuiz = useCallback(() => {
    setShowQuiz(false); 
    setCurrentQuestion(null); 
    setGameState('BATTLE'); 
  }, [setShowQuiz, setCurrentQuestion, setGameState]);

 
  const answerQuestion = useCallback(
    async (answer: string) => {
      if (!battleState?.battleId || !currentQuestion) {
        console.error('Batalha ou pergunta não disponível');
        return;
      }

      const requestData: SubmitAnswerRequest = {
        battleId: Number(battleState.battleId), 
        questionId: currentQuestion.id,
        answer: answer,
      };

      try {
        const newBattleState = await submitAnswer(requestData);

        if (newBattleState) {
          
          updateBattleState(newBattleState);
        }

        
        setTimeout(() => {
          closeQuiz();
        }, 2000); 
      } catch (err) {
        console.error('❌ [useBattleScreen] Erro ao submeter resposta:', err);
        setGameMessage('Erro ao processar sua resposta.'); 
        setTimeout(() => {
          closeQuiz();
        }, 2000);
      }
    },
    [
      battleState,
      currentQuestion,
      submitAnswer,
      updateBattleState,
      closeQuiz,
      setGameMessage, 
    ]
  );

 
  const saveBattleProgress = useCallback(async () => {
    if (!battleState?.battleId || !battleState.character?.id) {
      console.error('Batalha não iniciada ou personagem sem ID');
      return;
    }

    await saveProgress({
      battleId: battleState.battleId,
      characterId: String(battleState.character.id),
      battleState: battleState,
    });
  }, [battleState, saveProgress]);

  return {
    battleState,
    player,
    monster: enemy, 
    gameMessage, 
    currentQuestion, 
    showQuiz, 
    loading,
    error,
    startBattle,
    executeBattleAction,
    answerQuestion,
    openQuiz,
    closeQuiz,
    saveBattleProgress,
    submitAnswer,
  };
};