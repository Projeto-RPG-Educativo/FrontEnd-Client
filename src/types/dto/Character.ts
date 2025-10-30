export type ClassName = 
| 'mage' 
| 'rogue' 
| 'paladin' 
| 'bard' 
| 'tank' 
| 'fighter'
;

export type Monster = {
  id: number | string;
  name: string;
  hp: number;
  damage: number;
  type?: string;
  isBoss?: boolean;
  maxHp: number;
  image?: string;
};

// --- RESPONSES (Recebimento da API) ---

export interface GameClassDTO {
  id: number;
  name: string;
  hp: number;
  stamina: number;
  strength: number;
  intelligence: number;
}

export interface CharacterListResponse {
  id: number;
  nome: string;
  className: string;
  level: number; 
  xp: number;
}

export interface CharacterResponse {
  id: number;
  nome: string;
  xp: number;
  gold: number;
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  lastSavedAt: string;
  userId: number;
  userName: string;
  classId: number;
  className: string;
}

// --- REQUESTS (Envio para a API) ---

export interface CreateCharacterRequest {
  Userid: number;
  classe: ClassName | string;
}

export interface UpdateCharacterRequest {
  characterId: number;
  xp: number;
  hp: number;
}

export interface FullClassData {
  id: number;
  name: ClassName;
  backendName: string;
  description?: string;
  image?: string;
  hp: number;
  stamina: number;
  strength: number;
  intelligence: number;
}

export interface CharacterImages {
      [key: string]: string;
}