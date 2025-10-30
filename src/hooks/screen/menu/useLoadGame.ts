import { useState, useCallback } from 'react';

import type { SaveSlot, SaveData } from '../../../types';
import { useSave } from '../../services/useSave';
interface DisplaySlot {
  id: number;
  slotNumber: number;
  name: string;
  level: string;
  saveData: SaveData | null;
  progress: string;
}

interface UseLoadGameReturn {
  slots: DisplaySlot[];
  loading: boolean;
  error: string | null;
  loadSaves: () => Promise<void>;
  loadGame: (slotId: number) => Promise<SaveData | null>;
  formatDate: (dataString: string) => string;
}

/**
 * Hook específico para a tela de Carregar Jogo
 * 
 * Gerencia a listagem e carregamento de saves
 * 
 * @example
 * ```tsx
 * const LoadGamePanel = () => {
 *   const {
 *     slots,
 *     carregando,
 *     erro,
 *     carregarSaves,
 *     carregarJogo,
 *   } = useLoadGamePanel();
 * 
 *   useEffect(() => {
 *     carregarSaves();
 *   }, []);
 * 
 *   const handleLoadClick = async (slotId: number) => {
 *     const saveData = await carregarJogo(slotId);
 *     if (saveData) {
 *       // Iniciar jogo com os dados carregados
 *     }
 *   };
 * };
 * ```
 */

export const useLoadGame = (): UseLoadGameReturn => {
  const [slots, setSlots] = useState<DisplaySlot[]>([]);
  const { 
    listSaves, 
    loadGame: loadGameService, 
    loading, 
    error 
  } = useSave();

  // Formatar data para exibição
  const formatDate = useCallback((dataString: string): string => {
    try {
      return new Date(dataString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Data inválida';
    }
  }, []);

  // Converter SaveSlot para DisplaySlot
  const convertToDisplaySlot = useCallback((saveSlot: SaveSlot): DisplaySlot => {
    // Criar SaveData a partir do SaveSlot
    const saveData: SaveData = {
        id: saveSlot.id,
        slotName: saveSlot.slotName || '1',
        character: saveSlot.character || { id: 0, nome: 'Desconhecido', classe: 'Desconhecido' },
        inventory: saveSlot.characterState.inventory || [],
        createdAt: saveSlot.lastSavedAt,
        updatedAt: saveSlot.lastSavedAt,
        playerLevel: saveSlot.characterState.level || 1,

        userId: 0,
        characterId: 0,
        savedAt: '',

        characterState: {
            hp: 0,
            maxHp: 0,
            stamina: 0,
            maxStamina: 0,
            level: 0,
            coins: 0,
            damage: undefined
        }
    };

    return {
      id: typeof saveSlot.id === 'number' ? saveSlot.id : Number(saveSlot.id), // por agora vou deixar pra passar somente int mas tem que pensar melhor se vale esse esforco todo
      slotNumber: saveSlot.slotNumber || 1,
      level: `Nível ${saveSlot.characterState.level || 1}`,
      name: saveSlot.slotName || `Save ${saveSlot.id}`,
      saveData,
      progress: `${saveSlot.characterState.questsCompleted?.length || 0} Missões`,
    };
  }, []);

  // Carregar lista de saves
  const loadSaves = useCallback(async () => {
    const saves = await listSaves();
    
    if (saves) {
      const displaySlots = saves.map(convertToDisplaySlot);
      setSlots(displaySlots);
    }
  }, [listSaves, convertToDisplaySlot]);

  // Carregar um jogo específico
  const loadGame = useCallback(async (slotId: number): Promise<SaveData | null> => {
    const saveData = await loadGameService(slotId.toString());
    return saveData;
  }, [loadGameService]);

  return {
    slots,
    loading,
    error: error ? error.message : null,
    loadSaves,
    loadGame,
    formatDate,
  };
};
