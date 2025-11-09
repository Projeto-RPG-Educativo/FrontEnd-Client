// ============================================
// ACHIEVEMENT DTOs
// ============================================

/**
 * Tipos de achievement disponíveis (21 conquistas)
 */
export const AchievementType = {
  // 🗡️ Batalha (4 conquistas)
  WIN_FIRST_BATTLE: 'WIN_FIRST_BATTLE',
  WIN_10_BATTLES: 'WIN_10_BATTLES',
  WIN_50_BATTLES: 'WIN_50_BATTLES',
  WIN_100_BATTLES: 'WIN_100_BATTLES',

  // 💥 Dano (3 conquistas)
  DEAL_1000_DAMAGE: 'DEAL_1000_DAMAGE',
  DEAL_5000_DAMAGE: 'DEAL_5000_DAMAGE',
  DEAL_10000_DAMAGE: 'DEAL_10000_DAMAGE',

  // 📚 Questões (3 conquistas)
  ANSWER_10_QUESTIONS: 'ANSWER_10_QUESTIONS',
  ANSWER_50_QUESTIONS: 'ANSWER_50_QUESTIONS',
  ANSWER_100_QUESTIONS: 'ANSWER_100_QUESTIONS',

  // 📜 Quests (3 conquistas)
  COMPLETE_FIRST_QUEST: 'COMPLETE_FIRST_QUEST',
  COMPLETE_10_QUESTS: 'COMPLETE_10_QUESTS',
  COMPLETE_25_QUESTS: 'COMPLETE_25_QUESTS',

  // ⬆️ Level (3 conquistas)
  REACH_LEVEL_5: 'REACH_LEVEL_5',
  REACH_LEVEL_10: 'REACH_LEVEL_10',
  REACH_LEVEL_20: 'REACH_LEVEL_20',

  // 🐉 Monstros (5 conquistas)
  DEFEAT_GOBLIN: 'DEFEAT_GOBLIN',
  DEFEAT_DRAGON: 'DEFEAT_DRAGON',
  DEFEAT_10_MONSTERS: 'DEFEAT_10_MONSTERS',
  DEFEAT_50_MONSTERS: 'DEFEAT_50_MONSTERS',
  DEFEAT_100_MONSTERS: 'DEFEAT_100_MONSTERS'
} as const;

export type AchievementType = typeof AchievementType[keyof typeof AchievementType];

/**
 * Categorias de achievement
 */
export const AchievementCategory = {
  BATTLE: 'BATTLE',
  DAMAGE: 'DAMAGE',
  QUESTIONS: 'QUESTIONS',
  QUESTS: 'QUESTS',
  LEVEL: 'LEVEL',
  MONSTERS: 'MONSTERS'
} as const;

export type AchievementCategory = typeof AchievementCategory[keyof typeof AchievementCategory];

/**
 * DTO de Achievement (resposta da API)
 */
export interface AchievementDto {
  id: number;
  character: {
    id: number;
    name: string;
  };
  type: AchievementType;
  progress: number;
  isCompleted: boolean;
  unlockedAt: string | null;      // ISO timestamp
}

/**
 * Response de percentual de conclusão
 */
export interface AchievementCompletionResponse {
  percentage: number;
  completedCount: number;
  totalCount: number;
}

/**
 * Metadados de um tipo de achievement (para UI)
 */
export interface AchievementMetadata {
  type: AchievementType;
  name: string;
  description: string;
  category: AchievementCategory;
  targetValue: number;
  icon: string;
  categoryIcon: string;
}

/**
 * Achievement enriquecido com metadados para UI
 */
export interface AchievementInfo extends AchievementDto {
  metadata: AchievementMetadata;
  percentComplete: number;        // (progress / targetValue) * 100
  unlockedDate: Date | null;      // Parsed date
}

/**
 * Agrupamento de achievements por categoria
 */
export interface AchievementsByCategory {
  category: AchievementCategory;
  categoryLabel: string;
  categoryIcon: string;
  achievements: AchievementInfo[];
  completedCount: number;
  totalCount: number;
}
