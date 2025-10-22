export type ClassName = 
| 'Mage' 
| 'Rogue' 
| 'Paladin' 
| 'Bard' 
| 'Tank' 
| 'Fighter'
;

// Interface Completa do jogador
export interface Player {
  id: number;
  name: string;
  className: ClassName;
  hp: number;
  maxHp: number;
  damage: number;
  abilityUsed: boolean;
  stamina: number;
  maxStamina: number;
  coins: number;
  level: number;
}

// Interface Completa do inimigo
export interface Enemy {
  enemyId: string;
  name: string;
  hp: number;
  maxHp: number;
  damage: number;
  type: string;
  isBoss?: boolean;
  image: string;
}

// ==================== Character Types (Backend Format) ====================
export interface Character {
  id: number | string;
  userId?: number;
  nome: string;
  classe: string;
  image?: string;
  hp: number;
  maxHp: number;
  stamina: number;
  maxStamina: number;
  level: number;
  coins: number;
  createdAt?: string;
}

export interface CreateCharacterRequest {
  nome: string;
  classe: ClassName | string;
  vida?: number;
  vidaMaxima?: number;
  ataque?: number;
  defesa?: number;
  energia?: number;
}

export interface UpdateCharacterRequest {
  nome?: string;
  classe?: ClassName | string;
  vida?: number;
  vidaMaxima?: number;
  ataque?: number;
  defesa?: number;
  energia?: number;
  hp?: number;
  maxHp?: number;
  stamina?: number;
  maxStamina?: number;
  level?: number;
  coins?: number;
}

