import { useCallback, useState } from 'react';
import { useBattle as useBattleService } from '../../services/useBattle';
import { useQuestion } from '../../services/useQuestion';
import type {
  BattleStateResponse,
  BattleActionRequest,
  SubmitAnswerRequest,
  BattleLogEntry,
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
  isLoadingNewQuestion: boolean;
  battleLogs: BattleLogEntry[];

  startBattle: (
    monsterId: number,
    difficulty: 'facil' | 'medio' | 'dificil',
    characterId: number
  ) => Promise<void>;
  executeBattleAction: (action: BattleActionRequest) => Promise<void>;
  answerQuestion: (answer: string) => Promise<void>;
  openQuiz: () => Promise<void>;
  closeQuiz: () => void;
  saveBattleProgress: () => Promise<void>;
  submitAnswer: (data: SubmitAnswerRequest) => Promise<BattleStateResponse | null>;
  
  executeMonsterTurn: () => Promise<void>;
  skipTurn: () => Promise<void>;
  checkAndExecuteMonsterTurn: () => Promise<void>;
  showVictoryModal: boolean;
  handleContinueBattle: () => void;
  handleReturnToHub: () => void;
  showBattleLog: boolean;
  toggleBattleLog: () => void;
}


export const useBattleScreen = (): UseBattleReturn => {
  const [isLoadingNewQuestion, setIsLoadingNewQuestion] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [battleLogs, setBattleLogs] = useState<BattleLogEntry[]>([]);
  const [showBattleLog, setShowBattleLog] = useState(false);

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
    setGameState,
  } = useGame();

  const {
    startBattle: startBattleService,
    executeAction,
    submitAnswer,
    saveProgress,
    loading: loadingBattle,
    error: errorBattle,
    executeMonsterTurn: executeMonsterTurnService,
    skipTurn: skipTurnService,
  } = useBattleService();


  const {
    fetchRandomQuestion,
    loading: loadingQuestion,
    error: errorQuestion,
  } = useQuestion();

  const loading = loadingBattle || loadingQuestion;
  const error = errorBattle?.message || errorQuestion?.message || null;

  const addBattleLog = useCallback((
    type: BattleLogEntry['type'],
    actor: BattleLogEntry['actor'],
    action: string,
    message: string,
    extra?: { damage?: number; heal?: number; energy?: number }
  ) => {
    const logEntry: BattleLogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      type,
      actor,
      action,
      message,
      ...extra,
    };
    
    setBattleLogs((prev) => [...prev, logEntry]);
    console.log('📝 [BattleLog]', logEntry);
  }, []);

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

      if (newBattleState.turnResult && newBattleState.turnResult.trim() !== '') {
        let logType: BattleLogEntry['type'] = 'system';
        let logActor: BattleLogEntry['actor'] = 'system';
        let damage: number | undefined = undefined;
        
        const turnResultLower = newBattleState.turnResult.toLowerCase();
        
        // Detectar ações do jogador
        if (turnResultLower.includes('você') || turnResultLower.includes('jogador')) {
          logActor = 'player';
          
          if (turnResultLower.includes('atac')) {
            logType = 'player-action';
          } else if (turnResultLower.includes('defend')) {
            logType = 'player-action';
          } else if (turnResultLower.includes('habilidade') || turnResultLower.includes('skill')) {
            logType = 'player-action';
          }
          
          if (turnResultLower.includes('dano') && newBattleState.characterDamageDealt > 0) {
            logType = 'damage';
            damage = newBattleState.characterDamageDealt;
          }
        }
        // Detectar ações do monstro
        else if (turnResultLower.includes('monstro') || turnResultLower.includes(newBattleState.monster.nome.toLowerCase())) {
          logActor = 'monster';
          
          if (turnResultLower.includes('atac')) {
            logType = 'monster-action';
          } else if (turnResultLower.includes('defend')) {
            logType = 'monster-action';
          } else if (turnResultLower.includes('habilidade') || turnResultLower.includes('skill')) {
            logType = 'monster-action';
          }
          
          if (turnResultLower.includes('dano') && newBattleState.monsterDamageDealt > 0) {
            logType = 'damage';
            damage = newBattleState.monsterDamageDealt;
          }
        }
        
        addBattleLog(
          logType,
          logActor,
          'turn-action',
          newBattleState.turnResult,
          damage ? { damage } : undefined
        );
      }

      if (newBattleState.characterActiveEffects && newBattleState.characterActiveEffects.length > 0) {
        const previousEffects = battleState?.characterActiveEffects || [];
        const newEffects = newBattleState.characterActiveEffects.filter(
          effect => !previousEffects.some(prev => prev.type === effect.type)
        );
        
        newEffects.forEach(effect => {
          addBattleLog(
            'effect',
            'player',
            'effect-applied',
            `recebeu efeito: ${effect.description}`,
          );
        });
      }

      if (newBattleState.monsterActiveEffects && newBattleState.monsterActiveEffects.length > 0) {
        const previousEffects = battleState?.monsterActiveEffects || [];
        const newEffects = newBattleState.monsterActiveEffects.filter(
          effect => !previousEffects.some(prev => prev.type === effect.type)
        );
        
        newEffects.forEach(effect => {
          addBattleLog(
            'effect',
            'monster',
            'effect-applied',
            `recebeu efeito: ${effect.description}`,
          );
        });
      }

      if (newBattleState.isFinished) {
        const playerHP = newBattleState.character.hp;
        const monsterHP = newBattleState.monster.hp;
        
        let vencedor = '';
        let playerWon = false;
        
        if (playerHP > 0 && monsterHP <= 0) {
          // Jogador venceu
          vencedor = 'Você venceu!';
          playerWon = true;
        } else if (monsterHP > 0 && playerHP <= 0) {
          // Monstro venceu
          vencedor = 'Você foi derrotado!';
          playerWon = false;
        } else if (playerHP <= 0 && monsterHP <= 0) {
          // Empate (ambos morreram)
          vencedor = 'Empate! Ambos foram derrotados!';
          playerWon = false;
        } else {
          // Caso inesperado - batalha finalizou mas ambos ainda tem HP
          vencedor = 'Batalha finalizada!';
          playerWon = playerHP > monsterHP;
        }
        
        setGameMessage(vencedor);
        
        addBattleLog(
          'system',
          'system',
          'battle-end',
          vencedor,
        );
        
        if (playerWon) {
          setShowVictoryModal(true);
        }
      }
    },
    [setBattleState, setPlayer, setEnemy, setGameMessage, battleState, addBattleLog] 
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
          characterId: player?.id || 0,
        });
        if (result) {
          console.log('✅ [useBattleScreen] Batalha iniciada com sucesso:', result);
          updateBattleState(result);
          
          setBattleLogs([]);
          addBattleLog(
            'system',
            'system',
            'start-battle',
            `Batalha iniciada contra ${result.monster.nome} (${difficulty})`,
          );
        } else {
          console.error('❌ [useBattleScreen] Resultado da batalha está vazio');
        }
      } catch (error) {
        console.error('❌ [useBattleScreen] Erro ao iniciar batalha:', error);
      }
    },
    [startBattleService, updateBattleState, addBattleLog]
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
        // O log será criado pelo updateBattleState usando o turnResult do backend
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
      
      console.log('📚 [useBattleScreen] Quiz aberto como overlay');
    }
  }, [
    fetchRandomQuestion,
    battleState,
    player,
    setCurrentQuestion,
    setShowQuiz,
  ]);

  const closeQuiz = useCallback(() => {
    setShowQuiz(false); 
    setCurrentQuestion(null); 
 
    console.log('📚 [useBattleScreen] Quiz fechado');
  }, [setShowQuiz, setCurrentQuestion]);

 
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
          if (newBattleState.message) {
            const isCorrect = newBattleState.message.includes('Correto') || 
                             newBattleState.message.includes('correta') ||
                             newBattleState.message.includes('correto');
            
            addBattleLog(
              'quiz',
              'player',
              'answer-question',
              newBattleState.message,
              isCorrect ? { energy: 2 } : undefined
            );
          }
          
          updateBattleState(newBattleState);
        }

        setIsLoadingNewQuestion(true);
        console.log('🔄 [useBattleScreen] Buscando nova pergunta após resposta...');
        
        if (!battleState || !player) {
          console.error('❌ [useBattleScreen] Estado de batalha ou jogador não disponível para buscar nova pergunta.');
          setIsLoadingNewQuestion(false);
          return;
        }

        const questionRequestData = {
          difficulty: battleState.difficulty,
          playerLevel: player.level ?? 1,
        };

        const newQuestion: QuestionFromBackend | null = await fetchRandomQuestion(questionRequestData);
        
        if (newQuestion) {
          const mappedQuestion: Question = {
            id: newQuestion.id,
            text: newQuestion.text,
            options: newQuestion.options,
            correctAnswer: newQuestion.correctAnswer,
            difficulty: newQuestion.difficulty,
            category: newQuestion.category,
            points: newQuestion.points,
          };

          setCurrentQuestion(mappedQuestion);
          console.log('✅ [useBattleScreen] Nova pergunta carregada:', mappedQuestion);
        } else {
          console.warn('⚠️ [useBattleScreen] Nenhuma nova pergunta disponível');
        }

        setIsLoadingNewQuestion(false);

      } catch (err) {
        console.error('❌ [useBattleScreen] Erro ao submeter resposta:', err);
        setGameMessage('Erro ao processar sua resposta.');
        setIsLoadingNewQuestion(false);
      }
    },
    [
      battleState,
      currentQuestion,
      submitAnswer,
      updateBattleState,
      setGameMessage,
      player,
      fetchRandomQuestion,
      setCurrentQuestion,
      setIsLoadingNewQuestion,
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

  const handleExecuteMonsterTurn = useCallback(async () => {
    console.log('👹 [useBattleScreen] Executando turno do monstro');
    try {
      const result = await executeMonsterTurnService();
      if (result) {
        console.log('✅ [useBattleScreen] Turno do monstro executado:', result);
        updateBattleState(result);
      }
    } catch (error) {
      console.error('❌ [useBattleScreen] Erro ao executar turno do monstro:', error);
    }
  }, [executeMonsterTurnService, updateBattleState]);

  const handleSkipTurn = useCallback(async () => {
    console.log('⏭️ [useBattleScreen] Passando turno (atordoado)');
    try {
      const result = await skipTurnService();
      if (result) {
        console.log('✅ [useBattleScreen] Turno passado:', result);
        updateBattleState(result);
      }
    } catch (error) {
      console.error('❌ [useBattleScreen] Erro ao passar turno:', error);
    }
  }, [skipTurnService, updateBattleState]);

  const checkAndExecuteMonsterTurn = useCallback(async () => {
    if (battleState?.waitingForMonsterTurn) {
      console.log('🔄 [useBattleScreen] Aguardando turno do monstro detectado, executando...');
      await handleExecuteMonsterTurn();
    }
  }, [battleState, handleExecuteMonsterTurn]);

  const handleContinueBattle = useCallback(async () => {
    console.log('⚔️ [useBattleScreen] Jogador escolheu continuar a batalha');
    setShowVictoryModal(false);
    
    if (battleState && player) {
      const nextMonsterId = battleState.monster.id + 1;
      const difficulty = battleState.difficulty as 'facil' | 'medio' | 'dificil';
      
      console.log(`🔄 [useBattleScreen] Iniciando nova batalha: Próximo Monstro ID ${nextMonsterId}, Dificuldade: ${difficulty}`);
      
      try {
        await startBattle(nextMonsterId, difficulty);
      } catch (error) {
        console.error('❌ [useBattleScreen] Erro ao iniciar nova batalha:', error);
        setGameMessage('Erro ao iniciar nova batalha. Retornando ao hub.');
        setTimeout(() => {
          setGameState('HUB');
        }, 2000);
      }
    } else {
      console.error('❌ [useBattleScreen] Estado de batalha ou jogador não disponível');
      setGameState('HUB');
    }
  }, [battleState, player, startBattle, setGameState, setGameMessage]);

  const handleReturnToHub = useCallback(() => {
    console.log('🏠 [useBattleScreen] Jogador escolheu voltar ao hub');
    setShowVictoryModal(false);
    setGameState('HUB');
    setBattleState(null);
    setEnemy(null);
    setCurrentQuestion(null);
    setShowQuiz(false);
  }, [setGameState, setBattleState, setEnemy, setCurrentQuestion, setShowQuiz]);

  const toggleBattleLog = useCallback(() => {
    setShowBattleLog(prev => !prev);
  }, []);

  return {
    battleState,
    player,
    monster: enemy, 
    gameMessage, 
    currentQuestion, 
    showQuiz, 
    loading,
    error,
    isLoadingNewQuestion,
    showVictoryModal,
    battleLogs,
    showBattleLog,
    startBattle,
    executeBattleAction,
    answerQuestion,
    openQuiz,
    closeQuiz,
    saveBattleProgress,
    submitAnswer,
    executeMonsterTurn: handleExecuteMonsterTurn,
    skipTurn: handleSkipTurn,
    checkAndExecuteMonsterTurn,
    handleContinueBattle,
    handleReturnToHub,
    toggleBattleLog,
  };
};