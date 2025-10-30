import api from '../api/api';

import type {
  GameClassDTO,
  CharacterListResponse,
  CharacterResponse,
  CreateCharacterRequest,
  UpdateCharacterRequest,
  Player
} from '../../types';

import { mapCharacterToPlayer } from '../../types/mapper/PlayerMapper';

// ==================== BUSCAR CLASSES DISPONÍVEIS ====================
export const getAvailableClasses = async (): Promise<GameClassDTO[]> => {
  try {
    const response = await api.get<GameClassDTO[]>('/classes');
    console.log(`✅ [CharacterService] ${response.data.length} classes encontradas.`);
    return response.data;

  } catch (error: any) {
    console.error('❌ [CharacterService] Erro ao buscar classes:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Erro ao buscar classes disponíveis');
  }
};

// ==================== LISTAR PERSONAGENS ====================
export const listCharacters = async (): Promise<CharacterListResponse[]> => {
  try {
    const response = await api.get<CharacterListResponse[]>('/characters');
    console.log(`✅ [CharacterService] ${response.data.length} personagens encontrados.`);
    return response.data;

  } catch (error: any) {
    console.error('❌ [CharacterService] Erro ao listar personagens:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Erro ao listar personagens');
  }
};

// ==================== CRIAR PERSONAGEM ====================
export const createCharacter = async (data: CreateCharacterRequest): Promise<CharacterResponse> => {
  try {
    console.log('➕ [CharacterService] Criando personagem...', data);
    const response = await api.post<CharacterResponse>('/characters', data);
    return response.data;

  } catch (error: any) {
    console.error('❌ [CharacterService] Erro ao criar personagem:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Erro ao criar personagem');
  }
};

// ==================== BUSCAR PERSONAGEM POR ID ====================
export const getCharacterById = async (id: number): Promise<CharacterResponse> => {
  try {
    console.log(`🔍 [CharacterService] Buscando personagem ID ${id}...`);
    const response = await api.get<CharacterResponse>(`/character/${id}`);
    return response.data;

  } catch (error: any) {
    console.error('❌ [CharacterService] Erro ao buscar personagem:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Erro ao buscar personagem');
  }
};

// Alias para getCharacter (compatibilidade com hooks)
export const getCharacter = getCharacterById;

// ==================== ATUALIZAR PERSONAGEM ====================
export const updateCharacter = async (
  id: number | string,
  data: UpdateCharacterRequest
): Promise<CharacterResponse> => {
  try {
    console.log(`✏️ [CharacterService] Atualizando personagem ID ${id}...`, data);
    const response = await api.put<CharacterResponse>(`/characters/progress/${id}`, data);
    return response.data;

  } catch (error: any) {
    console.error('❌ [CharacterService] Erro ao atualizar personagem:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Erro ao atualizar personagem');
  }
};

// ==================== DELETAR PERSONAGEM ====================
export const deleteCharacter = async (id: number | string): Promise<{ message: string }> => {
  try {
    console.log(`🗑️ [CharacterService] Deletando personagem ID ${id}...`);
    await api.delete(`/characters/${id}`);
    console.log('✅ [CharacterService] Personagem deletado.');
    return { message: 'Personagem deletado com sucesso' };
  } catch (error: any) {
    console.error('❌ [CharacterService] Erro ao deletar personagem:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Erro ao deletar personagem');
  }
};


export const getPlayerCharacter = async (id: number): Promise<Player> => {
  try {
   
    console.log(`🔍 [CharacterService] Buscando DTO do personagem ID ${id}...`);
    const characterDto = await getCharacterById(id);
    console.log('🔄 [CharacterService] Mapeando DTO para Modelo Player...');
    const playerModel = mapCharacterToPlayer(characterDto);

    console.log('✅ [CharacterService] Modelo Player pronto:', playerModel.nome);
    return playerModel;
    
  } catch (error: any) {
    console.error('❌ [CharacterService] Erro ao buscar e mapear Player:', error);
    throw new Error(error.message || 'Erro ao carregar personagem');
  }
};