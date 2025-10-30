import api from '../api/api';
import type {
  // DTOs da API
  CreateSaveRequest,
  GameSaveResponse,
  SaveDataFromBackend, 

  // Modelos de Domínio (Front-end)
  SaveData,
  SaveSlot,
} from '../../types';

import  { parseSaveData } from '../../types/mapper/SaveMapper';

// ==================== LISTAR SAVES ====================
export const listSaves = async (): Promise<SaveSlot[]> => {
  try {
    console.log('📂 [SaveService] Listando saves...');
    const response = await api.get<SaveDataFromBackend[]>('/saves/');
    console.log('📦 [SaveService] Dados brutos recebidos:', response.data.length, 'saves');

    // Converter para formato SaveSlot
   const saveSlots: SaveSlot[] = response.data.map((rawSave) => ({
      id: rawSave.id,
      userId: rawSave.userId,
      characterId: rawSave.characterId,
      characterName: rawSave.character.nome,
      slotName: rawSave.slotName,
      lastSavedAt: rawSave.savedAt,
      character: {
        ...rawSave.character,
        image: rawSave.character.image ?? undefined,
      },
      characterState: rawSave.characterState,
    }));
    
    console.log(`✅ [SaveService] ${saveSlots.length} saves encontrados.`);
    return saveSlots;
    
  } catch (error: any) {
    console.error('❌ [SaveService] Erro ao listar saves:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw new Error(error.response?.data?.message || 'Erro ao carregar saves');
  }
};

// ==================== SALVAR JOGO ====================
export const saveGame = async (data: CreateSaveRequest): Promise<void> => {
  try {
    console.log('💾 [SaveService] Salvando jogo...', {
      characterId: data.characterId,
      slotNumber: data.slotName,
    });
    
    await api.post<GameSaveResponse>('/saves/', {
      characterId: data.characterId,
      slotName: data.slotName || `Slot ${data.slotName || 1}`,
      characterState: data.currentState,
    });
    
    console.log('✅ [SaveService] Jogo salvo com sucesso!');
    
  } catch (error: any) {
    console.error('❌ [SaveService] Erro ao salvar jogo:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw new Error(error.response?.data?.message || 'Erro ao salvar jogo');
  }
};

// ==================== DELETAR SAVE ====================
export const deleteSave = async (
  saveId: number | string
): Promise<{ message: string }> => {
  try {
    console.log(`🗑️ [SaveService] Deletando save ID ${saveId}...`);

    await api.delete(`/saves/${saveId}`);

    console.log('✅ [SaveService] Save deletado.');
    return { message: 'Save deletado com sucesso' };
  } catch (error: any) {
    console.error('❌ [SaveService] Erro ao deletar save:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Erro ao deletar save');
  }
};


// Precisa de correção

export const loadGame = async (saveId: number | string): Promise<SaveData> => {
  try {
    console.log(`📂 [SaveService] Carregando save por slot: ${saveId}...`);

    const response = await api.get<SaveDataFromBackend>(`/saves/slot/${saveId}`);

    console.log('📦 [SaveService] Dados brutos carregados:', response.data);

    const parsed = parseSaveData(response.data);

    if (!parsed) {
      throw new Error('Resposta inválida do servidor ao carregar jogo');
    }

    console.log('✅ [SaveService] Jogo carregado com sucesso:', parsed.slotName);
    return parsed;
  } catch (error: any) {
    console.error('❌ [SaveService] Erro ao carregar jogo:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw new Error(error.response?.data?.message || 'Erro ao carregar jogo');
  }
};

export default {
  listSaves,
  saveGame,
  loadGame,
  deleteSave,
};
