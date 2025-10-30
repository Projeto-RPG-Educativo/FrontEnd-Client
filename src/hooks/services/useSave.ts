import { useState } from 'react';
import {
  listSaves,
  saveGame,
  loadGame,
  deleteSave,
} from '../../services/menu/SaveService';

import type {
  SaveSlot,
  CreateSaveRequest,
  SaveData,
} from '../../types';

interface UseSaveReturn {
  saves: SaveSlot[];
  currentSave: SaveData | null;
  loading: boolean;
  error: Error | null;
  listSaves: () => Promise<SaveSlot[]>;
  saveGame: (data: CreateSaveRequest) => Promise<boolean>;
  loadGame: (saveId: string) => Promise<SaveData | null>;
  deleteSave: (saveId: string) => Promise<boolean>;
  clearCurrentSave: () => void;
  clearError: () => void;
}

/**
 * Hook para gerenciar sistema de save/load
 * 
 * @example
 * ```tsx
 * const { saveGame, loadGame, listSaves, saves } = useSave();
 * 
 * // Salvar jogo
 * const handleSalvar = async () => {
 *   const sucesso = await saveGame({
 *     characterId: 'char-123',
 *     saveData: {
 *       character: characterState,
 *       inventory: items,
 *       progress: gameProgress
 *     },
 *     slotNumber: 1
 *   });
 *   
 *   if (sucesso) {
 *     console.log('Jogo salvo com sucesso!');
 *   }
 * };
 * 
 * // Carregar jogo
 * const handleCarregar = async (saveId: string) => {
 *   const dadosSalvos = await loadGame(saveId);
 *   if (dadosSalvos) {
 *     // Restaurar estado do jogo
 *     console.log('Jogo carregado:', dadosSalvos);
 *   }
 * };
 * ```
 */
export const useSave = (): UseSaveReturn => {
  const [saves, setSaves] = useState<SaveSlot[]>([]);
  const [currentSave, setCurrentSave] = useState<SaveData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleListSaves = async (): Promise<SaveSlot[]> => {
    setLoading(true);
    setError(null);
    try {
      const savesList = await listSaves();
      setSaves(savesList);
      return savesList;
    } catch (err) {
      setError(err as Error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleSaveGame = async (data: CreateSaveRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await saveGame(data);
      await handleListSaves();
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLoadGame = async (saveId: string): Promise<SaveData | null> => {
    setLoading(true);
    setError(null);
    try {
      const savedData = await loadGame(saveId);
      setCurrentSave(savedData);
      return savedData;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSave = async (saveId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteSave(saveId);
      setSaves((prev) => prev.filter((s) => s.id !== saveId));
      if (currentSave?.id === Number(saveId)) {
        setCurrentSave(null);
      }
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearCurrentSave = () => {
    setCurrentSave(null);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    saves,
    currentSave,
    loading,
    error,
    listSaves: handleListSaves,
    saveGame: handleSaveGame,
    loadGame: handleLoadGame,
    deleteSave: handleDeleteSave,
    clearCurrentSave,
    clearError,
  };
};
