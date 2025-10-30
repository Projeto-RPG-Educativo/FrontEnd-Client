import type { CharacterListResponse } from '../';
import type { UserStatsResponse } from './User';

/**
 * Modelo de dados para a tela principal (Hub) do jogador.
 * Combina estatísticas e a lista de personagens.
 */
export interface HubModel {
  stats: UserStatsResponse;
  characters: CharacterListResponse[];
}
// TOWER

export interface Skill {
  id: string;
  name: string;
  description: string;
  type: 'passive' | 'active';
  cost: number;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  requirements?: {
    level?: number;
    goldCost?: number;
    prerequisiteSkills?: string[];
  };
  effects: {
    stat: string;
    value: number;
    type: 'flat' | 'percentage';
  }[];
}


export interface SkillsResponse {
  skills: Skill[];
  availablePoints: number;
  totalSpent: number;
}


export interface PurchaseSkillRequest {
  skillId: number;
}

export interface PurchaseSkillResponse {
  success: boolean;
  message: string;
  updatedSkill: Skill;
  remainingPoints: number;
}

// CENTRAL

export interface PlayerStats {
  id: string;
  userId: string;
  totalBattles: number;
  victories: number;
  defeats: number;
  questionsAnswered: number;
  correctAnswers: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
  goldEarned: number;
  expEarned: number;
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface PlayerAchievements {
  userId: string;
  achievements: Achievement[];
  totalUnlocked: number;
  totalAvailable: number;
}

export interface BattleRecord {
  id: string;
  characterId: string;
  characterName: string;
  enemyName: string;
  enemyType: 'minion' | 'boss';
  result: 'victory' | 'defeat';
  turnCount: number;
  expGained: number;
  goldGained: number;
  questionsAnswered: number;
  correctAnswers: number;
  battleDate: string;
}

export interface BattleHistory {
  userId: string;
  battles: BattleRecord[];
  totalBattles: number;
}

export interface RankingEntry {
  rank: number;
  userId: string;
  username: string;
  characterName: string;
  characterClass: string;
  level: number;
  totalVictories: number;
  winRate: number;
  score: number;
}

export interface Rankings {
  rankings: RankingEntry[];
  userRank?: RankingEntry;
  totalPlayers: number;
}

// LIBRARY

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  pages: number;
  read: boolean;
  rewards?: {
    exp?: number;
    gold?: number;
    statBonus?: {
      stat: string;
      value: number;
    };
  };
}

export interface BookDetails extends Book {
  content: string;
  chapters: {
    id: string;
    title: string;
    summary: string;
  }[];
}

export interface BooksResponse {
  books: Book[];
  totalRead: number;
  totalAvailable: number;
}

// SCHOOL

export interface Professor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  avatar: string;
  description: string;
  available: boolean;
}

export interface ProfessorDialogue {
  id: string;
  professorId: string;
  text: string;
  choices?: {
    id: string;
    text: string;
    nextDialogueId?: string;
    rewards?: {
      exp?: number;
      gold?: number;
      item?: string;
    };
  }[];
}

export interface ProfessorsResponse {
  professors: Professor[];
}

export interface ProfessorDialoguesResponse {
  dialogues: ProfessorDialogue[];
  currentDialogue: ProfessorDialogue;
}

// STORE

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'consumable' | 'book' | 'misc';
  price: number;
  stock: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  effects?: {
    stat: string;
    value: number;
  }[];
}


export interface StoresResponse {
  items: StoreItem[];
  playerGold: number;
}

export interface PurchaseItemRequest {
  itemId: number; 
  quantity: number;
  lojaId?: number; 
}

export interface PurchaseItemResponse {
  success: boolean;
  message: string;
  item: StoreItem;
  remainingGold: number;
}