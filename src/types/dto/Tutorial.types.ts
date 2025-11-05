/**
 * ============================================
 * TIPOS E INTERFACES DO SISTEMA DE TUTORIAL
 * ============================================
 * Centraliza todos os tipos relacionados ao tutorial
 * para evitar duplicação e facilitar manutenção.
 */

import { type ClassName } from './Character';

// ==================== ESTADOS DO TUTORIAL ====================

/**
 * Estado principal do tutorial
 */
export type TutorialState = 
  | 'NOT_STARTED'    // Player não iniciou o tutorial
  | 'IN_PROGRESS'    // Tutorial em andamento
  | 'COMPLETED';     // Tutorial finalizado

/**
 * Estados das cutscenes/diálogos durante o tutorial
 */
export type CutsceneState = 
  | 'IDLE'                    // Nenhuma cutscene ativa
  | 'TUTORIAL_INTRO'          // Diálogos 1-6: Introdução inicial (tela isolada)
  | 'FIRST_BATTLE'            // Diálogos 7-13: Tutorial de batalha (overlay interativo)
  | 'LORE_EXPLANATION'        // Diálogos 14-17: Explicação de lore (tela isolada)
  | 'HUB_EXPLANATION'         // Diálogos 18-23: Explicação do Hub (overlay/tela)
  | 'GUILD_WELCOME';          // Diálogo final na Tower (overlay)

// ==================== CUTSCENE ====================

/**
 * Speaker/NPC que fala no diálogo
 */
export interface Speaker {
  id: number;
  name: string;
  description?: string;
  type?: string;
  location?: string;
}

/**
 * Resposta da API para diálogos
 */
export interface ApiDialogueResponse {
  id: number;
  content: string;
  response?: string;
  npc: {
    id: number;
    name: string;
    description?: string;
    type?: string;
    location?: string;
  };
}

/**
 * Linha de diálogo processada (após mapear da API)
 */
export interface DialogueLine {
  id: number;
  content: string;
  response?: string;
  speaker: Speaker;
}

/**
 * Representa uma cutscene no tutorial
 */
export interface TutorialCutscene {
  /** Identificador único da cutscene */
  id: number;
  /** Nome descritivo da cutscene */
  name: string;
  /** IDs dos diálogos que compõem esta cutscene */
  dialogueIds: number[];
  /** Caminho para imagem de fundo (opcional) */
  background?: string;
  /** Se deve ser exibido como overlay (true) ou tela isolada (false) */
  isOverlay: boolean;
  /** Estado da cutscene associado */
  state: CutsceneState;
}

/**
 * Posição e tamanho do spotlight (esfera de luz)
 */
export interface SpotlightConfig {
  /** Posição X do centro do spotlight (em % da tela) */
  x: number;
  /** Posição Y do centro do spotlight (em % da tela) */
  y: number;
  /** Raio do spotlight (em px) */
  radius: number;
}

/**
 * Configuração de diálogo dentro de uma cutscene
 */
export interface DialogueConfig {
  /** ID único do diálogo */
  id: number;
  /** Texto do diálogo */
  text: string;
  /** Nome do personagem que fala */
  speaker: string;
  /** Caminho para imagem do personagem */
  characterImage?: string;
  /** Ação esperada do player (para diálogos interativos) */
  expectedAction?: BattleActionType;
  /** Configuração de spotlight para destacar área específica */
  spotlight?: SpotlightConfig;
}

// ==================== BATALHA TUTORIAL ====================

/**
 * Etapas do tutorial de batalha interativo (FIRST_BATTLE)
 */
export type TutorialBattleStep = 
  | 'ATTACK_TUTORIAL'    // Diálogo 7: Ensina botão de ataque
  | 'DEFEND_TUTORIAL'    // Diálogo 8: Ensina botão de defesa
  | 'SKILL_TUTORIAL'     // Diálogo 9: Ensina botão de skill
  | 'ENERGY_EXPLANATION' // Diálogo 10: Explica energia
  | 'QUIZ_TUTORIAL'      // Diálogo 11: Ensina botão de quiz
  | 'QUIZ_ANSWER'        // Diálogo 12: Explica respostas do quiz
  | 'BATTLE_CONCLUSION'  // Diálogo 13: Conclusão da batalha
  | 'COMPLETE';          // Tutorial de batalha completo

/**
 * Tipo de ação que o jogador pode executar
 */
export type BattleActionType = 'ATTACK' | 'DEFEND' | 'SKILLS' | 'QUIZ' | 'ANSWER';

/**
 * Tipo de elemento UI que pode ser destacado
 */
export type TutorialHighlight = 
  | 'attack-button' 
  | 'defend-button' 
  | 'skills-button' 
  | 'quiz-button'
  | 'quiz-answers'
  | 'energy-bar'
  | null;

/**
 * Configuração de uma etapa do tutorial de batalha
 */
export interface TutorialBattleStepConfig {
  /** Identificador da etapa */
  id: TutorialBattleStep;
  /** ID do diálogo associado */
  dialogueId: number;
  /** Instrução que será exibida ao jogador */
  instruction: string;
  /** Ação esperada do player para avançar */
  expectedAction?: BattleActionType;
  /** Elemento da UI que deve ser destacado */
  highlight: TutorialHighlight;
  /** Se deve bloquear o avanço automático (aguarda ação do player) */
  waitForAction: boolean;
}

// ==================== TUTORIAL CONTEXT ====================

/**
 * Tipo do contexto de tutorial - NOVO SISTEMA
 */
export interface TutorialContextType {
  // ===== Estado Principal =====
  /** Estado principal do tutorial (NOT_STARTED, IN_PROGRESS, COMPLETED) */
  tutorialState: TutorialState;
  /** Estado da cutscene atual */
  cutsceneState: CutsceneState;
  
  // ===== Cutscene/Diálogo Atual =====
  /** Cutscene atualmente sendo exibida */
  currentCutscene: TutorialCutscene | null;
  /** Diálogo atual dentro da cutscene */
  currentDialogueId: number | null;
  /** Deve mostrar como overlay (true) ou tela isolada (false)? */
  isOverlay: boolean;
  
  // ===== Battle Tutorial (FIRST_BATTLE) =====
  /** Tutorial de batalha está ativo? */
  isBattleTutorialActive: boolean;
  /** Etapa atual do tutorial de batalha */
  currentBattleStep: TutorialBattleStep;
  /** Configuração da etapa atual */
  currentBattleStepConfig: TutorialBattleStepConfig | null;
  /** Última ação executada pelo player */
  lastPlayerAction: BattleActionType | null;
  
  // ===== Actions - Controle Principal =====
  /** Inicia o tutorial (muda para IN_PROGRESS) */
  startTutorial: () => void;
  /** Finaliza o tutorial completamente (muda para COMPLETED) */
  completeTutorial: () => void;
  
  // ===== Actions - Cutscenes =====
  /** Avança para o próximo diálogo da cutscene atual */
  nextDialogue: () => void;
  /** Completa a cutscene atual e avança o fluxo */
  completeCutscene: () => void;
  
  // ===== Actions - Battle Tutorial =====
  /** Registra ação do player durante tutorial de batalha */
  registerPlayerAction: (action: BattleActionType) => void;
  /** Avança para próxima etapa do tutorial de batalha */
  nextBattleStep: () => void;
  /** Notifica que o monstro foi derrotado */
  onMonsterDefeated: () => void;
  /** Verifica se uma ação específica é permitida no tutorial */
  isActionAllowed: (action: BattleActionType) => boolean;
}

// ==================== PROPS ====================

/**
 * Props do componente de Cutscene
 */
export interface CutsceneProps {
  /** Cutscene a ser exibida */
  cutscene: TutorialCutscene;
  /** Classe selecionada pelo jogador */
  selectedClass: ClassName | null;
  /** Callback quando cutscene completa */
  onComplete: () => void;
  /** Deve iniciar automaticamente? */
  autoStart?: boolean;
  /** É um overlay sobre outra tela? */
  isOverlay?: boolean;
}

/**
 * Props do TutorialProvider
 */
export interface TutorialProviderProps {
  children: React.ReactNode;
}
