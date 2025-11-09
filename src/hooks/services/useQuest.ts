import { useState, useEffect, useCallback } from 'react';
import { questService } from '../../services/quest/QuestService';
import type { QuestDto, QuestInfo, AcceptQuestResponse } from '../../types/dto/Quest';

interface UseQuestReturn {
  quests: QuestInfo[];
  activeQuest: QuestInfo | null;
  availableQuests: QuestInfo[];
  completedQuests: QuestInfo[];
  loading: boolean;
  error: string | null;
  acceptQuest: (questId: number) => Promise<AcceptQuestResponse | null>;
  abandonQuest: (questId: number) => Promise<boolean>;
  refreshQuests: () => Promise<void>;
}

/**
 * Hook customizado para gerenciar quests
 * @param characterId - ID do personagem
 * @returns Gerenciamento de quests
 */
export function useQuest(characterId: number | null): UseQuestReturn {
  const [quests, setQuests] = useState<QuestDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega todas as quests do personagem
   */
  const loadQuests = useCallback(async () => {
    if (!characterId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await questService.getAllQuests(characterId);
      setQuests(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar quests';
      setError(message);
      console.error('Erro ao carregar quests:', err);
    } finally {
      setLoading(false);
    }
  }, [characterId]);

  /**
   * Aceita uma quest
   */
  const acceptQuest = useCallback(async (questId: number): Promise<AcceptQuestResponse | null> => {
    if (!characterId) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await questService.acceptQuest(questId, characterId);
      await loadQuests(); // Recarrega as quests
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao aceitar quest';
      setError(message);
      console.error('Erro ao aceitar quest:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [characterId, loadQuests]);

  /**
   * Abandona uma quest ativa
   */
  const abandonQuest = useCallback(async (questId: number): Promise<boolean> => {
    if (!characterId) return false;

    setLoading(true);
    setError(null);

    try {
      await questService.abandonQuest(questId, characterId);
      await loadQuests(); // Recarrega as quests
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao abandonar quest';
      setError(message);
      console.error('Erro ao abandonar quest:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [characterId, loadQuests]);

  /**
   * Carrega quests ao montar o componente
   */
  useEffect(() => {
    loadQuests();
  }, [loadQuests]);

  // Processa as quests para adicionar informações de UI
  const enrichedQuests = quests.map(q => questService.enrichQuestInfo(q));

  // Separa por categoria
  const activeQuest = enrichedQuests.find(q => q.isActive) || null;
  const availableQuests = enrichedQuests.filter(q => q.isAvailable);
  const completedQuests = enrichedQuests.filter(q => q.isCompleted);

  return {
    quests: enrichedQuests,
    activeQuest,
    availableQuests,
    completedQuests,
    loading,
    error,
    acceptQuest,
    abandonQuest,
    refreshQuests: loadQuests
  };
}
