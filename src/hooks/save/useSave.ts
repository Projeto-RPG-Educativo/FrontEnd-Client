import { useState } from 'react';
import {
  listSaves,
  saveGame,
  loadGame,
  deleteSave,
} from '../../services/menu/load/SaveService';

import type {
  SaveSlot,
  SaveGameRequest,
  SaveData,
} from '../../types/Save';

interface UseSaveReturn {
  saves: SaveSlot[];
  saveAtual: SaveData | null;
  carregando: boolean;
  erro: Error | null;
  listarSaves: () => Promise<SaveSlot[]>;
  salvarJogo: (dados: SaveGameRequest) => Promise<boolean>;
  carregarJogo: (saveId: string) => Promise<SaveData | null>;
  deletarSave: (saveId: string) => Promise<boolean>;
  limparSaveAtual: () => void;
  limparErro: () => void;
}

/**
 * Hook para gerenciar sistema de save/load
 * 
 * @example
 * ```tsx
 * const { salvarJogo, carregarJogo, listarSaves, saves } = useSave();
 * 
 * // Salvar jogo
 * const handleSalvar = async () => {
 *   const sucesso = await salvarJogo({
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
 *   const dadosSalvos = await carregarJogo(saveId);
 *   if (dadosSalvos) {
 *     // Restaurar estado do jogo
 *     console.log('Jogo carregado:', dadosSalvos);
 *   }
 * };
 * ```
 */
export const useSave = (): UseSaveReturn => {
  const [saves, setSaves] = useState<SaveSlot[]>([]);
  const [saveAtual, setSaveAtual] = useState<SaveData | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<Error | null>(null);

  const listarSaves = async (): Promise<SaveSlot[]> => {
    setCarregando(true);
    setErro(null);
    try {
      const listaSaves = await listSaves();
      setSaves(listaSaves);
      return listaSaves;
    } catch (error) {
      setErro(error as Error);
      return [];
    } finally {
      setCarregando(false);
    }
  };

  const salvarJogo = async (dados: SaveGameRequest): Promise<boolean> => {
    setCarregando(true);
    setErro(null);
    try {
      await saveGame(dados);
      // Atualizar lista de saves após salvar
      await listarSaves();
      return true;
    } catch (error) {
      setErro(error as Error);
      return false;
    } finally {
      setCarregando(false);
    }
  };

  const carregarJogo = async (saveId: string): Promise<SaveData | null> => {
    setCarregando(true);
    setErro(null);
    try {
      const dadosSalvos = await loadGame(saveId);
      setSaveAtual(dadosSalvos);
      return dadosSalvos;
    } catch (error) {
      setErro(error as Error);
      return null;
    } finally {
      setCarregando(false);
    }
  };

  const deletarSave = async (saveId: string): Promise<boolean> => {
    setCarregando(true);
    setErro(null);
    try {
      await deleteSave(saveId);
      setSaves((prev) => prev.filter((s) => s.id !== saveId));
      if (saveAtual?.id === Number(saveId)) {
        setSaveAtual(null);
      }
      return true;
    } catch (error) {
      setErro(error as Error);
      return false;
    } finally {
      setCarregando(false);
    }
  };

  const limparSaveAtual = () => {
    setSaveAtual(null);
  };

  const limparErro = () => {
    setErro(null);
  };

  return {
    saves,
    saveAtual,
    carregando,
    erro,
    listarSaves,
    salvarJogo,
    carregarJogo,
    deletarSave,
    limparSaveAtual,
    limparErro,
  };
};
