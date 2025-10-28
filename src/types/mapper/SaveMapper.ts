import type { SaveData, SaveDataFromBackend } from '../dto/Save';


/**
 * MAPPERS (Lógica de transformação)
 * Mova-os para 'src/mappers/Save.mapper.ts'
 */


// ✅ Type Guard para validar characterState
export function isValidCharacterState(
  state: unknown
): state is SaveData['characterState'] {
  if (!state || typeof state !== 'object') {
    console.error('❌ characterState não é um objeto:', state);
    return false;
  }
  const s = state as any;
  const isValid =
    typeof s.hp === 'number' &&
    typeof s.maxHp === 'number' &&
    typeof s.stamina === 'number' &&
    typeof s.maxStamina === 'number' &&
    typeof s.level === 'number' &&
    typeof s.coins === 'number';

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
    if (!isValidCharacterState(raw.characterState)) {
      console.error('❌ [parseSaveData] characterState inválido para save:', raw.id);
      return null;
    }
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
        image: raw.character.image || undefined,
      },
      characterState: raw.characterState,
      createdAt: raw.savedAt,
      updatedAt: raw.savedAt,
      playerLevel: 0, // Você pode querer extrair isso do characterState
    };
    console.log('✅ [parseSaveData] Save parseado:', parsed.slotName);
    return parsed;
  } catch (error) {
    console.error('❌ [parseSaveData] Erro ao parsear save:', error);
    return null;
  }
}