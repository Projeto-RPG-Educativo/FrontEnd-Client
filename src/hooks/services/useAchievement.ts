import { useState, useEffect, useCallback } from 'react';
import { achievementService } from '../../services/achievement/AchievementService';
import type {
  AchievementDto,
  AchievementInfo,
  AchievementsByCategory,
  AchievementCompletionResponse
} from '../../types/dto/Achievement';

interface UseAchievementReturn {
  achievements: AchievementInfo[];
  achievementsByCategory: AchievementsByCategory[];
  completedAchievements: AchievementInfo[];
  inProgressAchievements: AchievementInfo[];
  recentAchievements: AchievementInfo[];
  almostCompleted: AchievementInfo[];
  completion: AchievementCompletionResponse | null;
  loading: boolean;
  error: string | null;
  refreshAchievements: () => Promise<void>;
}

/**
 * Hook customizado para gerenciar achievements
 * @param characterId - ID do personagem
 * @returns Gerenciamento de achievements
 */
export function useAchievement(characterId: number | null): UseAchievementReturn {
  const [achievements, setAchievements] = useState<AchievementDto[]>([]);
  const [completion, setCompletion] = useState<AchievementCompletionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega todas as conquistas do personagem
   */
  const loadAchievements = useCallback(async () => {
    if (!characterId) return;

    setLoading(true);
    setError(null);

    try {
      const [achievementsData, completionData] = await Promise.all([
        achievementService.getAllAchievements(characterId),
        achievementService.getCompletionPercentage(characterId)
      ]);

      setAchievements(achievementsData);
      setCompletion(completionData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar conquistas';
      setError(message);
      console.error('Erro ao carregar conquistas:', err);
    } finally {
      setLoading(false);
    }
  }, [characterId]);

  /**
   * Carrega conquistas ao montar o componente
   */
  useEffect(() => {
    loadAchievements();
  }, [loadAchievements]);

  // Processa as conquistas
  const enrichedAchievements = achievements.map(a => 
    achievementService.enrichAchievementInfo(a)
  );

  // Separa por status
  const completedAchievements = enrichedAchievements.filter(a => a.isCompleted);
  const inProgressAchievements = enrichedAchievements.filter(
    a => !a.isCompleted && a.progress > 0
  );

  // Conquistas recentes (últimas 24h)
  const recentAchievements = achievementService
    .filterRecentUnlocked(achievements)
    .map(a => achievementService.enrichAchievementInfo(a));

  // Conquistas quase completas (>80%)
  const almostCompleted = achievementService.getAlmostCompleted(achievements);

  // Agrupa por categoria
  const achievementsByCategory = achievementService.groupByCategory(achievements);

  return {
    achievements: enrichedAchievements,
    achievementsByCategory,
    completedAchievements,
    inProgressAchievements,
    recentAchievements,
    almostCompleted,
    completion,
    loading,
    error,
    refreshAchievements: loadAchievements
  };
}
