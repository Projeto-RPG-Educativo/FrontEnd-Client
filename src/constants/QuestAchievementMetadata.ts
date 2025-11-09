// ============================================
// QUEST & ACHIEVEMENT METADATA
// ============================================

import { QuestType, AchievementType, AchievementCategory } from '../types';
import type { AchievementMetadata } from '../types/dto/Achievement';

/**
 * Mapeamento de tipos de quest para ícones e labels
 */
export const QUEST_TYPE_INFO: Record<QuestType, { icon: string; label: string }> = {
  [QuestType.ANSWER_QUESTIONS]: {
    icon: '🎯',
    label: 'Conhecimento'
  },
  [QuestType.DEFEAT_MONSTER]: {
    icon: '🐉',
    label: 'Caça ao Monstro'
  },
  [QuestType.WIN_BATTLES]: {
    icon: '⚔️',
    label: 'Batalhas'
  },
  [QuestType.REACH_LEVEL]: {
    icon: '⬆️',
    label: 'Progressão'
  },
  [QuestType.DEAL_DAMAGE]: {
    icon: '💥',
    label: 'Destruição'
  }
};

/**
 * Metadados completos de todas as conquistas (21 achievements)
 */
export const ACHIEVEMENT_METADATA: Record<AchievementType, AchievementMetadata> = {
  // 🗡️ Batalha
  [AchievementType.WIN_FIRST_BATTLE]: {
    type: AchievementType.WIN_FIRST_BATTLE,
    name: 'Primeira Vitória',
    description: 'Vença sua primeira batalha',
    category: AchievementCategory.BATTLE,
    targetValue: 1,
    icon: '🎉',
    categoryIcon: '⚔️'
  },
  [AchievementType.WIN_10_BATTLES]: {
    type: AchievementType.WIN_10_BATTLES,
    name: 'Guerreiro Iniciante',
    description: 'Vença 10 batalhas',
    category: AchievementCategory.BATTLE,
    targetValue: 10,
    icon: '🛡️',
    categoryIcon: '⚔️'
  },
  [AchievementType.WIN_50_BATTLES]: {
    type: AchievementType.WIN_50_BATTLES,
    name: 'Guerreiro Veterano',
    description: 'Vença 50 batalhas',
    category: AchievementCategory.BATTLE,
    targetValue: 50,
    icon: '⚔️',
    categoryIcon: '⚔️'
  },
  [AchievementType.WIN_100_BATTLES]: {
    type: AchievementType.WIN_100_BATTLES,
    name: 'Mestre da Guerra',
    description: 'Vença 100 batalhas',
    category: AchievementCategory.BATTLE,
    targetValue: 100,
    icon: '👑',
    categoryIcon: '⚔️'
  },

  // 💥 Dano
  [AchievementType.DEAL_1000_DAMAGE]: {
    type: AchievementType.DEAL_1000_DAMAGE,
    name: 'Destruidor',
    description: 'Cause 1000 de dano total',
    category: AchievementCategory.DAMAGE,
    targetValue: 1000,
    icon: '💪',
    categoryIcon: '💥'
  },
  [AchievementType.DEAL_5000_DAMAGE]: {
    type: AchievementType.DEAL_5000_DAMAGE,
    name: 'Aniquilador',
    description: 'Cause 5000 de dano total',
    category: AchievementCategory.DAMAGE,
    targetValue: 5000,
    icon: '💥',
    categoryIcon: '💥'
  },
  [AchievementType.DEAL_10000_DAMAGE]: {
    type: AchievementType.DEAL_10000_DAMAGE,
    name: 'Devastador',
    description: 'Cause 10000 de dano total',
    category: AchievementCategory.DAMAGE,
    targetValue: 10000,
    icon: '🔥',
    categoryIcon: '💥'
  },

  // 📚 Questões
  [AchievementType.ANSWER_10_QUESTIONS]: {
    type: AchievementType.ANSWER_10_QUESTIONS,
    name: 'Estudante Dedicado',
    description: 'Acerte 10 questões',
    category: AchievementCategory.QUESTIONS,
    targetValue: 10,
    icon: '📖',
    categoryIcon: '📚'
  },
  [AchievementType.ANSWER_50_QUESTIONS]: {
    type: AchievementType.ANSWER_50_QUESTIONS,
    name: 'Sábio Aprendiz',
    description: 'Acerte 50 questões',
    category: AchievementCategory.QUESTIONS,
    targetValue: 50,
    icon: '🎓',
    categoryIcon: '📚'
  },
  [AchievementType.ANSWER_100_QUESTIONS]: {
    type: AchievementType.ANSWER_100_QUESTIONS,
    name: 'Mestre do Conhecimento',
    description: 'Acerte 100 questões',
    category: AchievementCategory.QUESTIONS,
    targetValue: 100,
    icon: '🧙',
    categoryIcon: '📚'
  },

  // 📜 Quests
  [AchievementType.COMPLETE_FIRST_QUEST]: {
    type: AchievementType.COMPLETE_FIRST_QUEST,
    name: 'Primeira Missão',
    description: 'Complete sua primeira quest',
    category: AchievementCategory.QUESTS,
    targetValue: 1,
    icon: '🎯',
    categoryIcon: '📜'
  },
  [AchievementType.COMPLETE_10_QUESTS]: {
    type: AchievementType.COMPLETE_10_QUESTS,
    name: 'Aventureiro Dedicado',
    description: 'Complete 10 quests',
    category: AchievementCategory.QUESTS,
    targetValue: 10,
    icon: '🗺️',
    categoryIcon: '📜'
  },
  [AchievementType.COMPLETE_25_QUESTS]: {
    type: AchievementType.COMPLETE_25_QUESTS,
    name: 'Lenda Viva',
    description: 'Complete 25 quests',
    category: AchievementCategory.QUESTS,
    targetValue: 25,
    icon: '⭐',
    categoryIcon: '📜'
  },

  // ⬆️ Level
  [AchievementType.REACH_LEVEL_5]: {
    type: AchievementType.REACH_LEVEL_5,
    name: 'Crescimento Inicial',
    description: 'Alcance o nível 5',
    category: AchievementCategory.LEVEL,
    targetValue: 5,
    icon: '🌱',
    categoryIcon: '⬆️'
  },
  [AchievementType.REACH_LEVEL_10]: {
    type: AchievementType.REACH_LEVEL_10,
    name: 'Poder Crescente',
    description: 'Alcance o nível 10',
    category: AchievementCategory.LEVEL,
    targetValue: 10,
    icon: '🌿',
    categoryIcon: '⬆️'
  },
  [AchievementType.REACH_LEVEL_20]: {
    type: AchievementType.REACH_LEVEL_20,
    name: 'Herói Poderoso',
    description: 'Alcance o nível 20',
    category: AchievementCategory.LEVEL,
    targetValue: 20,
    icon: '🌳',
    categoryIcon: '⬆️'
  },

  // 🐉 Monstros
  [AchievementType.DEFEAT_GOBLIN]: {
    type: AchievementType.DEFEAT_GOBLIN,
    name: 'Caçador de Goblins',
    description: 'Derrote um Goblin',
    category: AchievementCategory.MONSTERS,
    targetValue: 1,
    icon: '🗡️',
    categoryIcon: '🐉'
  },
  [AchievementType.DEFEAT_DRAGON]: {
    type: AchievementType.DEFEAT_DRAGON,
    name: 'Matador de Dragões',
    description: 'Derrote um Dragão',
    category: AchievementCategory.MONSTERS,
    targetValue: 1,
    icon: '🐲',
    categoryIcon: '🐉'
  },
  [AchievementType.DEFEAT_10_MONSTERS]: {
    type: AchievementType.DEFEAT_10_MONSTERS,
    name: 'Caçador de Monstros',
    description: 'Derrote 10 monstros',
    category: AchievementCategory.MONSTERS,
    targetValue: 10,
    icon: '🏹',
    categoryIcon: '🐉'
  },
  [AchievementType.DEFEAT_50_MONSTERS]: {
    type: AchievementType.DEFEAT_50_MONSTERS,
    name: 'Exterminador',
    description: 'Derrote 50 monstros',
    category: AchievementCategory.MONSTERS,
    targetValue: 50,
    icon: '⚔️',
    categoryIcon: '🐉'
  },
  [AchievementType.DEFEAT_100_MONSTERS]: {
    type: AchievementType.DEFEAT_100_MONSTERS,
    name: 'Lenda dos Monstros',
    description: 'Derrote 100 monstros',
    category: AchievementCategory.MONSTERS,
    targetValue: 100,
    icon: '👹',
    categoryIcon: '🐉'
  }
};

/**
 * Labels traduzidos das categorias
 */
export const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  [AchievementCategory.BATTLE]: 'Batalha',
  [AchievementCategory.DAMAGE]: 'Dano',
  [AchievementCategory.QUESTIONS]: 'Conhecimento',
  [AchievementCategory.QUESTS]: 'Missões',
  [AchievementCategory.LEVEL]: 'Progressão',
  [AchievementCategory.MONSTERS]: 'Caça aos Monstros'
};

/**
 * Ícones das categorias
 */
export const CATEGORY_ICONS: Record<AchievementCategory, string> = {
  [AchievementCategory.BATTLE]: '⚔️',
  [AchievementCategory.DAMAGE]: '💥',
  [AchievementCategory.QUESTIONS]: '📚',
  [AchievementCategory.QUESTS]: '📜',
  [AchievementCategory.LEVEL]: '⬆️',
  [AchievementCategory.MONSTERS]: '🐉'
};
