import type { QuestionInfo } from './Question';

// --- REQUESTS (Envio para API) ---

export interface StartBattleRequest {
  monsterId: number;
  difficulty: "facil" | "medio" | "dificil";
  characterId: number;
}

export interface BattleActionRequest {
  action: "attack" | "defend" | "useskill";
}

export interface SubmitAnswerRequest {
  battleId: number;
  questionId: number;
  answer: string;
}

// --- LOG DE BATALHA ---

export interface BattleLogEntry {
  id: string;
  timestamp?: number;
  type: 'player-action' | 'monster-action' | 'damage' | 'heal' | 'effect' | 'quiz' | 'system';
  actor?: 'player' | 'monster' | 'system';
  action?: string;
  damage?: number;
  heal?: number;
  energy?: number;
  message: string;
}

// --- RESPONSES (Recebimento da API) ---

export interface ActiveEffect {
  type: string;
  magnitude: number;
  duration: number;
  description: string;
}

export interface CharacterBattleInfo {
  id: number;
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  className: string;
  strength: number;
  intelligence: number;
  defense: number;
  level: number;
  xp: number;
  maxXpForLevel: number;
  isDefending: boolean;
  effects: Record<string, any>;
}

export interface MonsterBattleInfo {
  id: number;
  hp: number;
  maxHp: number;
  dano: number;
  defense: number;
  isDefending: boolean;
  nome: string;
}

export interface BattleStateResponse {
  battleId: number;
  difficulty: string;
  character: CharacterBattleInfo;
  monster: MonsterBattleInfo;
  currentQuestion: QuestionInfo | null;
  isFinished: boolean;
  bardChallengeActive: boolean;
  turnResult: string;
  message: string;
  winner?: 'character' | 'monster';
  
  isPlayerTurn: boolean;
  waitingForMonsterTurn: boolean;
  pendingDamageToMonster: number;
  
  characterDamageDealt: number;
  monsterDamageDealt: number;
  monsterAction: string;
  
  characterActiveEffects: ActiveEffect[];
  monsterActiveEffects: ActiveEffect[];
  monsterGuaranteedAttacks: number;
}

// LEGADO MAU FEITO 

export interface BattleSaveProgressRequestlegado {
  characterId: string;
  battleState: Partial<BattleStateResponse>;
  battleId: any;

}

export interface BattleSaveProgressResponseLegado {
  success: boolean;
  message: string;
}

// Validação posterior necessaria

export interface Effect {
  name: string;
  turns: number;
  description: string;
}

// Removed duplicate and conflicting BattleLogEntry interface

// (O Modelo Principal)
export interface BattleModel {
  battleId: number;
  difficulty: string;
  isFinished: boolean;
  battleLog: BattleLogEntry[]; 
  character: CharacterBattleInfo & {
    effects: Effect[];
  };
  monster: MonsterBattleInfo;
  currentQuestion: QuestionInfo & {
  selectedAnswer: string | null;
  };
}