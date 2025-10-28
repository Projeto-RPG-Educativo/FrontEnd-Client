import type { QuestionInfo } from './Question';

// --- REQUESTS (Envio para API) ---

export interface StartBattleRequest {
  monsterId: number;
  difficulty: "facil" | "medio" | "dificil";
}

export interface BattleActionRequest {
  action: "attack" | "defend" | "useSkill";
}

export interface SubmitAnswerRequest {
  battleId: number;
  questionId: number;
  answer: string;
}

// --- RESPONSES (Recebimento da API) ---

export interface CharacterBattleInfo {
  id: number;
  hp: number;
  energy: number;
  className: string;
  strength: number;
  intelligence: number;
  level: number;
  xp: number;
  isDefending: boolean;
  effects: Record<string, any>;
}

export interface MonsterBattleInfo {
  id: number;
  hp: number;
  dano: number;
  nome: string;
}

export interface BattleStateResponse {
  battleId: number;
  difficulty: string;
  character: CharacterBattleInfo;
  monster: MonsterBattleInfo;
  currentQuestion: QuestionInfo;
  isFinished: boolean;
  bardChallengeActive: boolean;
  turnResult: string;
  message: string;
  winner?: 'character' | 'monster';
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

// extra da uma verificada melhor na logica

// (Primeiro, defina os sub-modelos)
export interface Effect {
  name: string;
  turns: number;
  description: string;
}

export interface BattleLogEntry {
  id: string;
  message: string;
  type: 'damage' | 'heal' | 'status' | 'info';
}

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