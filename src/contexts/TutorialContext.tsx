/**
 * ============================================
 * TUTORIAL CONTEXT - NOVO SISTEMA
 * ============================================
 * Orquestrador do tutorial com estados claros e fluxo bem definido
 * 
 * FLUXO DO TUTORIAL:
 * 1. NOT_STARTED → Player no menu principal
 * 2. IN_PROGRESS → Player escolhe iniciar tutorial
 * 3. TUTORIAL_INTRO → Diálogos 1-6 (tela isolada)
 * 4. FIRST_BATTLE → Diálogos 7-13 (overlay interativo)
 * 5. LORE_EXPLANATION → Diálogos 14-17 (tela isolada)
 * 6. HUB_EXPLANATION → Diálogos 18-23 (overlay)
 * 7. GUILD_WELCOME → Diálogo final na Tower
 * 8. COMPLETED → Tutorial finalizado
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useGame } from './GameContext';
import { startBattle } from '../services/battle/BattleService';
import type { Player, Monster } from '../types';
import type { 
  TutorialContextType,
  TutorialState,
  CutsceneState,
  TutorialCutscene,
  TutorialBattleStep,
  TutorialBattleStepConfig,
  BattleActionType,
  TutorialProviderProps
} from '../types/dto/Tutorial.types';
import fundo1 from '../assets/Images/cutScene/CutScene1.jpg';
import fundo2 from '../assets/Images/cutScene/CutScene2.jpg';

// ==================== CONFIGURAÇÃO DAS CUTSCENES ====================

const CUTSCENES: Record<CutsceneState, TutorialCutscene | null> = {
  IDLE: null,
  
  // Diálogos 1-6: Introdução (tela isolada com fundo)
  TUTORIAL_INTRO: {
    id: 1,
    name: 'Introdução ao Tutorial',
    dialogueIds: [1, 2, 3, 4, 5, 6],
    background: fundo1,
    isOverlay: false,
    state: 'TUTORIAL_INTRO'
  },
  
  // Diálogos 7-13: Tutorial de batalha interativo (overlay)
  FIRST_BATTLE: {
    id: 2,
    name: 'Primeira Batalha - Tutorial Interativo',
    dialogueIds: [7, 8, 9, 10, 11, 12, 13],
    isOverlay: true,
    state: 'FIRST_BATTLE'
  },
  
  // Diálogos 14-17: Explicação de lore (tela isolada)
  LORE_EXPLANATION: {
    id: 3,
    name: 'Explicação de Lore',
    dialogueIds: [14, 15, 16, 17],
    background: fundo2,
    isOverlay: false,
    state: 'LORE_EXPLANATION'
  },
  
  // Diálogos 18-23: Explicação do Hub (overlay)
  HUB_EXPLANATION: {
    id: 4,
    name: 'Explicação do Hub',
    dialogueIds: [18, 19, 20, 21, 22, 23],
    isOverlay: true,
    state: 'HUB_EXPLANATION'
  },
  
  // Diálogo final na Tower
  GUILD_WELCOME: {
    id: 5,
    name: 'Boas-vindas à Guilda',
    dialogueIds: [24],
    isOverlay: true,
    state: 'GUILD_WELCOME'
  }
};

// ==================== SPOTLIGHT CONFIGURATIONS ====================

/**
 * Mapeamento de configurações de spotlight por dialogueId
 * Use isso para destacar áreas específicas durante os diálogos do Hub
 */
export const SPOTLIGHT_CONFIGS: Record<number, { x: number; y: number; radius: number }> = {
  // HUB_EXPLANATION - Diálogos 18-23
  18: { x: 28, y: 30, radius: 220 },  // Palco da retorica vulgo ARENA
  19: { x: 35, y: 77, radius: 180 },  // LOJA
  20: { x: 80, y: 72, radius: 180 },  // BIBLIOTECA
  21: { x: 50, y: 30, radius: 180 },  // TORRE
  22: { x: 50, y: 30, radius: 180 },  // TORRE 
};

// ==================== ETAPAS DO TUTORIAL DE BATALHA ====================

const BATTLE_TUTORIAL_STEPS: TutorialBattleStepConfig[] = [
  {
    id: 'ATTACK_TUTORIAL',
    dialogueId: 7,
    instruction: "Vê o botão 'Atacar'? Use-o para um ataque básico. É como o 'simple present' do combate: direto, eficaz, mas consome um pouco de energia.",
    expectedAction: 'ATTACK',
    highlight: 'attack-button',
    waitForAction: true
  },
  {
    id: 'DEFEND_TUTORIAL',
    dialogueId: 8,
    instruction: "Agora teste o botão 'Defender'. Ele reduz o dano que você recebe no próximo turno.",
    expectedAction: 'DEFEND',
    highlight: 'defend-button',
    waitForAction: true
  },
  {
    id: 'SKILL_TUTORIAL',
    dialogueId: 9,
    instruction: "Hora de usar uma habilidade especial! Clique no botão 'Habilidades' para ver suas skills.",
    expectedAction: 'SKILLS',
    highlight: 'skills-button',
    waitForAction: true
  },
  {
    id: 'ENERGY_EXPLANATION',
    dialogueId: 10,
    instruction: "Observe sua barra de energia. Cada ação consome energia, e ela se regenera a cada turno.",
    expectedAction: undefined, // Nenhuma ação esperada - bloqueia todos os botões
    highlight: 'energy-bar',
    waitForAction: false
  },
  {
    id: 'QUIZ_TUTORIAL',
    dialogueId: 11,
    instruction: "Veja o botão de Quiz! Responder perguntas restaura sua energia. É essencial para batalhas longas!",
    expectedAction: 'QUIZ',
    highlight: 'quiz-button',
    waitForAction: true
  },
  {
    id: 'QUIZ_ANSWER',
    dialogueId: 12,
    instruction: "Ótimo! Agora selecione uma resposta clicando em um dos botões de alternativa!",
    expectedAction: 'ANSWER',
    highlight: 'quiz-answers',
    waitForAction: true
  },
  {
    id: 'BATTLE_CONCLUSION',
    dialogueId: 13,
    instruction: "Agora você conhece os fundamentos do combate! Clique em Finalizar para continuar sua jornada!",
    highlight: null,
    waitForAction: false // Botão "Finalizar" aparecerá
  },
  {
    id: 'COMPLETE',
    dialogueId: -1,
    instruction: "",
    highlight: null,
    waitForAction: false
  }
];

// ==================== CONTEXT ====================

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

// ==================== PROVIDER ====================

export const TutorialProvider: React.FC<TutorialProviderProps> = ({ children }) => {
  const { setGameState, player, setPlayer, setEnemy, setBattleState } = useGame();
  
  // Estados principais
  const [tutorialState, setTutorialState] = useState<TutorialState>('NOT_STARTED');
  const [cutsceneState, setCutsceneState] = useState<CutsceneState>('IDLE');
  const [currentDialogueId, setCurrentDialogueId] = useState<number | null>(null);
  
  // Estados do tutorial de batalha
  const [currentBattleStep, setCurrentBattleStep] = useState<TutorialBattleStep>('ATTACK_TUTORIAL');
  const [lastPlayerAction, setLastPlayerAction] = useState<BattleActionType | null>(null);
  
  // ==================== COMPUTED VALUES ====================
  
  const currentCutscene = useMemo(() => {
    return CUTSCENES[cutsceneState];
  }, [cutsceneState]);
  
  const isOverlay = useMemo(() => {
    return currentCutscene?.isOverlay ?? false;
  }, [currentCutscene]);
  
  const isBattleTutorialActive = useMemo(() => {
    return cutsceneState === 'FIRST_BATTLE' && currentBattleStep !== 'COMPLETE';
  }, [cutsceneState, currentBattleStep]);
  
  // Debug: Log mudanças de cutscene
  useEffect(() => {
    console.log('🎬 [Tutorial] Estado da Cutscene mudou:', {
      cutsceneState,
      currentCutscene: currentCutscene?.name,
      isOverlay,
      currentDialogueId
    });
  }, [cutsceneState, currentCutscene, isOverlay, currentDialogueId]);
  
  const currentBattleStepConfig = useMemo(() => {
    if (!isBattleTutorialActive) return null;
    return BATTLE_TUTORIAL_STEPS.find(step => step.id === currentBattleStep) || null;
  }, [isBattleTutorialActive, currentBattleStep]);
  
  // ==================== ACTIONS - CONTROLE PRINCIPAL ====================
  
  const startTutorial = useCallback(() => {
    console.log('🎮 [Tutorial] Iniciando tutorial');
    setTutorialState('IN_PROGRESS');
    setCutsceneState('TUTORIAL_INTRO');
    setCurrentDialogueId(1);
    setGameState('TUTORIAL');
  }, [setGameState]);
  
  const completeTutorial = useCallback(() => {
    console.log('✅ [Tutorial] Tutorial completo!');
    setTutorialState('COMPLETED');
    setCutsceneState('IDLE');
    setCurrentDialogueId(null);
    // TODO: Salvar progresso do tutorial no backend
  }, []);
  
  // ==================== ACTIONS - CUTSCENES ====================
  
  const nextDialogue = useCallback(() => {
    if (!currentCutscene) return;
    
    const currentIndex = currentCutscene.dialogueIds.findIndex(id => id === currentDialogueId);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < currentCutscene.dialogueIds.length) {
      const nextId = currentCutscene.dialogueIds[nextIndex];
      console.log(`📖 [Tutorial] Avançando para diálogo ${nextId}`);
      setCurrentDialogueId(nextId);
    } else {
      completeCutscene();
    }
  }, [currentCutscene, currentDialogueId]);
  
  const completeCutscene = useCallback(async () => {
    console.log(`✅ [Tutorial] Cutscene ${cutsceneState} completa`);
    
    // Fluxo de transição entre cutscenes
    switch (cutsceneState) {
      case 'TUTORIAL_INTRO':
        // Após intro → Iniciar batalha de tutorial via API
        console.log('→ Transição: TUTORIAL_INTRO → FIRST_BATTLE');
        
        if (!player?.id) {
          console.error('❌ Player não encontrado. Não é possível iniciar batalha de tutorial.');
          return;
        }
        
        // Iniciar batalha de tutorial (monstro ID 1, dificuldade fácil)
        const tutorialMonsterId = 1;
        const tutorialDifficulty = "facil";
        console.log('⚔️ Iniciando batalha de tutorial - Player:', player.id, 'Monster:', tutorialMonsterId);
        
        try {
          // Aguardar API de início de batalha
          const battleResult = await startBattle({
            characterId: player.id,
            monsterId: tutorialMonsterId,
            difficulty: tutorialDifficulty
          });
          
          console.log('✅ Batalha de tutorial iniciada com sucesso:', battleResult);
          
          // Atualizar o GameContext com os dados da batalha
          setBattleState(battleResult);
          
          // Mapear character para Player
          if (battleResult.character) {
            const mappedPlayer: Player = {
              ...battleResult.character,
              nome: (battleResult.character as any).nome ?? '',
              stamina: (battleResult.character as any).energy ?? 0,
              maxStamina: (battleResult.character as any).maxEnergy ?? 0,
              maxHp: (battleResult.character as any).maxHp ?? 0,
              gold: (battleResult.character as any).gold ?? 0,
              lastSavedAt: (battleResult.character as any).lastSavedAt ?? '',
              className: (battleResult.character as any).className as any,
            };
            setPlayer(mappedPlayer);
          }
          
          // Mapear monster para Monster
          if (battleResult.monster) {
            const mappedMonster: Monster = {
              ...battleResult.monster,
              maxHp: (battleResult.monster as any).maxHp ?? 0,
              name: (battleResult.monster as any).nome ?? '',
              damage: (battleResult.monster as any).dano ?? 0,
            };
            setEnemy(mappedMonster);
          }
          
          // Configurar estado do tutorial APÓS a API responder e dados serem mapeados
          setCutsceneState('FIRST_BATTLE');
          setCurrentBattleStep('ATTACK_TUTORIAL');
          setCurrentDialogueId(7);
          setGameState('BATTLE');
        } catch (error) {
          console.error('❌ Erro ao iniciar batalha de tutorial:', error);
        }
        
        break;
        
      case 'FIRST_BATTLE':
        // Após batalha → Explicação de lore
        console.log('→ Transição: FIRST_BATTLE → LORE_EXPLANATION');
        console.log('📍 Setando cutsceneState para LORE_EXPLANATION');
        console.log('📍 Setando dialogueId para 14');
        console.log('📍 Setando gameState para TUTORIAL');
        setCutsceneState('LORE_EXPLANATION');
        setCurrentDialogueId(14);
        setGameState('TUTORIAL');
        break;
        
      case 'LORE_EXPLANATION':
        // Após lore → Hub explanation
        console.log('→ Transição: LORE_EXPLANATION → HUB_EXPLANATION');
        setCutsceneState('HUB_EXPLANATION');
        setCurrentDialogueId(18);
        setGameState('HUB');
        break;
        
      case 'HUB_EXPLANATION':
        // Após hub explanation → Tutorial completo! Player fica livre no Hub
        console.log('→ Transição: HUB_EXPLANATION → Tutorial Completo');
        console.log('✅ [Tutorial] Tutorial completamente finalizado!');
        setCutsceneState('IDLE');
        setCurrentDialogueId(null);
        completeTutorial(); // Marca tutorial como completo
        setGameState('HUB');
        break;
        
      case 'GUILD_WELCOME':
        // Fim do tutorial!
        console.log('→ Transição: GUILD_WELCOME → COMPLETED');
        completeTutorial();
        setGameState('HUB');
        break;
        
      default:
        setCutsceneState('IDLE');
    }
  }, [cutsceneState, setGameState, completeTutorial, player, setPlayer, setEnemy, setBattleState]);
  
  // ==================== ACTIONS - BATTLE TUTORIAL ====================
  
  const registerPlayerAction = useCallback((action: BattleActionType) => {
    console.log(`⚔️ [Tutorial] Player executou ação: ${action}`);
    setLastPlayerAction(action);
    
    // Se a ação atual espera por essa ação específica, avança
    const currentStep = BATTLE_TUTORIAL_STEPS.find(step => step.id === currentBattleStep);
    if (currentStep?.expectedAction === action) {
      console.log(`✅ [Tutorial] Ação esperada executada! Avançando...`);
      setTimeout(() => nextBattleStep(), 1000);
    }
  }, [currentBattleStep]);
  
  const nextBattleStep = useCallback(() => {
    const currentIndex = BATTLE_TUTORIAL_STEPS.findIndex(step => step.id === currentBattleStep);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < BATTLE_TUTORIAL_STEPS.length) {
      const nextStep = BATTLE_TUTORIAL_STEPS[nextIndex];
      console.log(`📚 [Tutorial] Avançando para etapa: ${nextStep.id}`);
      setCurrentBattleStep(nextStep.id);
      setCurrentDialogueId(nextStep.dialogueId);
    }
  }, [currentBattleStep]);
  
  const onMonsterDefeated = useCallback(() => {
    console.log('💀 [Tutorial] Monstro derrotado! Avançando para conclusão do tutorial');
    console.log('📍 [Tutorial] cutsceneState atual:', cutsceneState);
    // Avança para a conclusão do tutorial de batalha (mostra botão Finalizar)
    setCurrentBattleStep('BATTLE_CONCLUSION');
    setCurrentDialogueId(13);
  }, [cutsceneState]);
  
  // Helper para verificar se ação é permitida (usado nos botões)
  const isActionAllowed = useCallback((action: BattleActionType): boolean => {
    if (!isBattleTutorialActive) return true;
    const currentStep = BATTLE_TUTORIAL_STEPS.find(step => step.id === currentBattleStep);
    
    // Se não tem expectedAction definido (undefined), bloqueia TODAS as ações
    if (currentStep?.expectedAction === undefined) return false;
    
    // Se tem expectedAction, só permite essa ação específica
    return currentStep?.expectedAction === action;
  }, [isBattleTutorialActive, currentBattleStep]);
  
  // ==================== CONTEXT VALUE ====================
  
  const contextValue: TutorialContextType = useMemo(() => ({
    // Estado
    tutorialState,
    cutsceneState,
    currentCutscene,
    currentDialogueId,
    isOverlay,
    
    // Battle Tutorial
    isBattleTutorialActive,
    currentBattleStep,
    currentBattleStepConfig,
    lastPlayerAction,
    
    // Actions
    startTutorial,
    completeTutorial,
    nextDialogue,
    completeCutscene,
    registerPlayerAction,
    nextBattleStep,
    onMonsterDefeated,
    isActionAllowed,
  }), [
    tutorialState,
    cutsceneState,
    currentCutscene,
    currentDialogueId,
    isOverlay,
    isBattleTutorialActive,
    currentBattleStep,
    currentBattleStepConfig,
    lastPlayerAction,
    startTutorial,
    completeTutorial,
    nextDialogue,
    completeCutscene,
    registerPlayerAction,
    nextBattleStep,
    onMonsterDefeated,
    isActionAllowed,
  ]);
  
  return (
    <TutorialContext.Provider value={contextValue}>
      {children}
    </TutorialContext.Provider>
  );
};

// ==================== HOOK ====================

export const useTutorial = (): TutorialContextType => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within TutorialProvider');
  }
  return context;
};

// ==================== EXPORTS ====================

export { BATTLE_TUTORIAL_STEPS };
export type { TutorialBattleStepConfig };
