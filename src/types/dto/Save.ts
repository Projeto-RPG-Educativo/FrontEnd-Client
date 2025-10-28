import type { CharacterListResponse } from '../dto/Character';


// --- REQUESTS ---

export interface CreateSaveRequest {
  characterId: number;
  slotName: string;
  currentState: string; // JSON em formato string
}

// --- RESPONSES ---


export interface GameSaveResponse {
  id: number;
  characterId: number;
  slotName: string;
  currentState: string;
}

export interface SaveResponse {
  id: number;
  slotName: string;
  characterName: string;
  // ... outros campos
}

/**
 * Modelo para um "Save Slot" na tela de seleção.
 * Pode ser um personagem existente ou um slot vazio.
 */

export type SaveSlotModel =
  | {
      isEmpty: true;
      slotId: number;
    }
  | {
      isEmpty: false;
      slotId: number;
      character: CharacterListResponse;
    };

    export interface SaveSlot {
  id: number | string;
  userId?: number;
  characterId: number | string;
  characterName?: string;
  slotName?: string;
  slotNumber?: number;
  lastSavedAt: string;
  characterState?: any;
  character?: {
    id: number;
    nome: string;
    classe: string;
    image?: string;
  };
}

export interface SaveData {
  id: number | string;
  userId: number;
  characterId: number;
  slotName: string;
  savedAt: string;
  createdAt: string;
  updatedAt: string;
  playerLevel: number;

  character: {
    id: number;
    nome: string;
    classe: string;
    image?: string;
  };

  characterState: {
    hp: number;
    maxHp: number;
    stamina: number;
    maxStamina: number;
    level: number;
    coins: number;
    damage?: number;
    [key: string]: any;
  };

  inventory?: any[];
  progress?: any[];
}

export interface SaveDataFromBackend {
  id: number;
  userId: number;
  characterId: number;
  slotName: string;
  savedAt: string;
  characterState: unknown; // Corretamente tipado como unknown
  character: {
    id: number;
    nome: string;
    classe: string;
    image?: string | null;
  };
}