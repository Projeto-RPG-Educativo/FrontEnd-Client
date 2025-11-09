// ============================================
// QUEST DTOs
// ============================================

/**
 * Tipos de quest disponíveis no sistema
 */
export const QuestType = {
  ANSWER_QUESTIONS: 'ANSWER_QUESTIONS',
  DEFEAT_MONSTER: 'DEFEAT_MONSTER',
  WIN_BATTLES: 'WIN_BATTLES',
  REACH_LEVEL: 'REACH_LEVEL',
  DEAL_DAMAGE: 'DEAL_DAMAGE'
} as const;

export type QuestType = typeof QuestType[keyof typeof QuestType];

/**
 * Status possíveis de uma quest
 */
export const QuestStatus = {
  AVAILABLE: 'available',        // null no backend, quest disponível
  IN_PROGRESS: 'in_progress',    // Quest ativa
  COMPLETED: 'completed',        // Quest finalizada
  FAILED: 'failed'              // Quest abandonada
} as const;

export type QuestStatus = typeof QuestStatus[keyof typeof QuestStatus];

/**
 * DTO de Quest (resposta da API)
 */
export interface QuestDto {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  goldReward: number;
  type: QuestType;
  targetValue: number;
  targetId: number | null;        // ID do monstro (apenas DEFEAT_MONSTER)
  targetName: string | null;      // Nome do monstro (apenas DEFEAT_MONSTER)
  progress: number;
  status: QuestStatus | null;     // null = disponível
}

/**
 * Request para aceitar uma quest
 */
export interface AcceptQuestRequest {
  questId: number;
  characterId: number;
}

/**
 * Response ao aceitar uma quest
 */
export interface AcceptQuestResponse {
  characterId: number;
  characterName: string;
  questId: number;
  questTitle: string;
  questDescription: string;
  status: QuestStatus;
  progress: number;
  targetValue: number;
  message: string;
}

/**
 * DTO de progresso de quest durante batalha
 */
export interface QuestProgressDto {
  questId: number;
  questTitle: string;
  currentProgress: number;
  targetValue: number;
  justCompleted: boolean;
  progressMessage: string;
}

/**
 * Informações detalhadas de uma quest para UI
 */
export interface QuestInfo extends QuestDto {
  percentComplete: number;        // Calculado no frontend
  isActive: boolean;              // status === 'in_progress'
  isCompleted: boolean;           // status === 'completed'
  isAvailable: boolean;           // status === null
  typeIcon: string;               // Ícone baseado no tipo
  typeLabel: string;              // Label traduzido do tipo
}
