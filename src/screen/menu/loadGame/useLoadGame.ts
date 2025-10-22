import { useState, useCallback } from 'react';

import type { SaveSlot, SaveData } from '../../../types/Save';
import { useSave } from '../../../hooks/save/useSave';
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
  carregando: boolean;
  erro: string | null;
  carregarSaves: () => Promise<void>;
  carregarJogo: (slotId: number) => Promise<SaveData | null>;
  formatarData: (dataString: string) => string;
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
    listarSaves, 
    carregarJogo: loadGameService, 
    carregando, 
    erro 
  } = useSave();

  // Formatar data para exibição
  const formatarData = useCallback((dataString: string): string => {
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
  const converterParaDisplaySlot = useCallback((saveSlot: SaveSlot): DisplaySlot => {
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
  const carregarSaves = useCallback(async () => {
    const saves = await listarSaves();
    
    if (saves) {
      const displaySlots = saves.map(converterParaDisplaySlot);
      setSlots(displaySlots);
    }
  }, [listarSaves, converterParaDisplaySlot]);

  // Carregar um jogo específico
  const carregarJogo = useCallback(async (slotId: number): Promise<SaveData | null> => {
    const saveData = await loadGameService(slotId.toString());
    return saveData;
  }, [loadGameService]);

  return {
    slots,
    carregando,
    erro: erro ? erro.message : null,
    carregarSaves,
    carregarJogo,
    formatarData,
  };
};
