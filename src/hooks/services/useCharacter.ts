import { useState } from 'react';
// ATUALIZADO: Importando os services corretos
import {
  listCharacters,
  getCharacter,
  createCharacter,
  updateCharacter, 
  deleteCharacter,
  getAvailableClasses,
} from '../../services/character/CharacterService';

// ATUALIZADO: Importando os DTOs corretos da API
import type {
  CharacterResponse, // DTO de detalhe (Rota 6)
  CharacterListResponse, // DTO de lista (Rota 7)
  CreateCharacterRequest, // DTO de criação (Rota 8)
  UpdateCharacterRequest, // DTO de update (Rota 9)
  GameClassDTO,
} from '../../types'; // Assumindo que seu index.ts exporta tudo

// ATUALIZADO: Renomeado o alias para o DTO de lista
export type CharacterSummary = CharacterListResponse;

interface UseCharacterReturn {
  characters: CharacterSummary[]; // ATUALIZADO: Usa o DTO de lista
  currentCharacter: CharacterResponse | null; // ATUALIZADO: Usa o DTO de detalhe
  classes: GameClassDTO[]; // ATUALIZADO: Usa o DTO de classe
  loading: boolean;
  error: Error | null;
  listCharacters: () => Promise<CharacterSummary[]>;
  fetchCharacter: (id: number) => Promise<CharacterResponse | null>;
  createCharacter: (
    data: CreateCharacterRequest
  ) => Promise<CharacterResponse | null>;
  updateCharacterProgress: ( // ATUALIZADO: Nome da função reflete a API
    id: number,
    data: UpdateCharacterRequest
  ) => Promise<CharacterResponse | null>;
  deleteCharacter: (id: number) => Promise<boolean>;
  fetchClasses: () => Promise<GameClassDTO[]>;
  clearError: () => void;
}

/**
 * Hook para gerenciar personagens
 */
export const useCharacter = (): UseCharacterReturn => {
  // ATUALIZADO: Estado 'characters' usa o DTO de lista
  const [characters, setCharacters] = useState<CharacterSummary[]>([]);
  const [currentCharacter, setCurrentCharacter] =
    useState<CharacterResponse | null>(null);
  // ATUALIZADO: Estado 'classes' usa o DTO de GameClass
  const [classes, setClasses] = useState<GameClassDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleListCharacters = async (): Promise<CharacterSummary[]> => {
    setLoading(true);
    setError(null);
    try {
      // O service 'listCharacters' retorna o DTO de lista
      const list = await listCharacters();
      setCharacters(list);
      return list;
    } catch (err) {
      setError(err as Error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleFetchCharacter = async (
    id: number
  ): Promise<CharacterResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const character = await getCharacter(id);
      setCurrentCharacter(character);
      return character;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCharacter = async (
    data: CreateCharacterRequest
  ): Promise<CharacterResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const newCharacter = await createCharacter(data);
      return newCharacter;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCharacterProgress = async (
    id: number,
    data: UpdateCharacterRequest 
  ): Promise<CharacterResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedCharacter = await updateCharacter(id, data);
      if (currentCharacter && currentCharacter.id === id) {
        setCurrentCharacter(updatedCharacter);
      }
      await handleListCharacters();
      return updatedCharacter;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCharacter = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteCharacter(id);
      if (currentCharacter && currentCharacter.id === id) {
        setCurrentCharacter(null);
      }
      await handleListCharacters();
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const handleFetchClasses = async (): Promise<GameClassDTO[]> => {
    setLoading(true);
    setError(null);
    try {
      const availableClasses = await getAvailableClasses();
      setClasses(availableClasses);
      return availableClasses;
    } catch (err) {
      setError(err as Error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    characters,
    currentCharacter,
    classes,
    loading,
    error,
    listCharacters: handleListCharacters,
    fetchCharacter: handleFetchCharacter,
    createCharacter: handleCreateCharacter,
    updateCharacterProgress: handleUpdateCharacterProgress,
    deleteCharacter: handleDeleteCharacter,
    fetchClasses: handleFetchClasses,
    clearError,
  };
};