export interface SaveDataFromBackend {
  id: number;
  userId: number;
  characterId: number;
  slotName: string;
  savedAt: string;
  characterState: unknown; 
  character: {
    id: number;
    nome: string;
    classe: string;
    image?: string | null; 
  };
}

export interface SaveData {
  id: number | string ;
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

export interface DisplaySlot {
  id: number;
  name: string;
  progress: string;
  saveData: SaveData | null;
}

// ✅ Type Guard para validar characterState
export function isValidCharacterState(state: unknown): state is SaveData['characterState'] {
  if (!state || typeof state !== 'object') {
    console.error('❌ characterState não é um objeto:', state);
    return false;
  }
  
  const s = state as any;
  
  const isValid = (
    typeof s.hp === 'number' &&
    typeof s.maxHp === 'number' &&
    typeof s.stamina === 'number' &&
    typeof s.maxStamina === 'number' &&
    typeof s.level === 'number' &&
    typeof s.coins === 'number'
  );

  if (!isValid) {
    console.error('❌ characterState com campos inválidos:', {
      hp: typeof s.hp,
      maxHp: typeof s.maxHp,
      stamina: typeof s.stamina,
      maxStamina: typeof s.maxStamina,
      level: typeof s.level,
      coins: typeof s.coins,
    });
  }

  return isValid;
}

// ✅ Converter SaveDataFromBackend → SaveData (com validação)
export function parseSaveData(raw: SaveDataFromBackend): SaveData | null {
  try {
    // Validar characterState
    if (!isValidCharacterState(raw.characterState)) {
      console.error('❌ [parseSaveData] characterState inválido para save:', raw.id);
      return null;
    }

    // Converter
    const parsed: SaveData = {
      id: raw.id,
      userId: raw.userId,
      characterId: raw.characterId,
      slotName: raw.slotName,
      savedAt: raw.savedAt,
      character: {
        id: raw.character.id,
        nome: raw.character.nome,
        classe: raw.character.classe,
        image: raw.character.image || undefined, // null → undefined
      },
      characterState: raw.characterState,
      createdAt: raw.savedAt,  // trocar depois por agora deixei assim ESPERO QUE RETORNE ERRO KK
      updatedAt: raw.savedAt,
      playerLevel: 0
    };

    console.log('✅ [parseSaveData] Save parseado:', parsed.slotName);
    return parsed;

  } catch (error) {
    console.error('❌ [parseSaveData] Erro ao parsear save:', error);
    return null;
  }
}

export interface DisplaySlot {
  id: number;
  name: string;
  progress: string;
  saveData: SaveData | null;
}

export interface SaveSlot {
  id: number | string;
  userId?: number;
  characterId: number | string;
  characterName?: string;
  slotName?: string;
  slotNumber?: number;
  lastSavedAt: string;
  // currentLocation: string;
  characterState?: any;
  character?: {
    id: number;
    nome: string;
    classe: string;
    image?: string;
  };
}

export interface SaveGameRequest {
  characterId: number | string;
  saveData: {
    character: any;
    inventory?: any[];
    progress?: any;
    [key: string]: any;
  };
  slotNumber?: number;
  slotName?: string;
}

export interface SaveGameResponse {
  success: boolean;
  message: string;
  saveId?: number | string;
  timestamp?: string;
}