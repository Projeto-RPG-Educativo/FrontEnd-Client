import api from '../api/api';
import type {
  AchievementDto,
  AchievementCompletionResponse,
  AchievementInfo,
  AchievementsByCategory
} from '../../types/dto/Achievement';
import { AchievementCategory } from '../../types/dto/Achievement';
import {
  ACHIEVEMENT_METADATA,
  CATEGORY_LABELS,
  CATEGORY_ICONS
} from '../../constants/QuestAchievementMetadata';

/**
 * Service para gerenciar achievements (conquistas)
 */
class AchievementService {
  /**
   * Lista todas as conquistas de um personagem
   * @param characterId - ID do personagem
   * @returns Array de conquistas
   */
  async getAllAchievements(characterId: number): Promise<AchievementDto[]> {
    try {
      const response = await api.get<AchievementDto[]>(
        `/api/achievements/character/${characterId}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar conquistas:', error);
      throw error;
    }
  }

  /**
   * Lista apenas conquistas completadas
   * @param characterId - ID do personagem
   * @returns Array de conquistas completadas
   */
  async getCompletedAchievements(characterId: number): Promise<AchievementDto[]> {
    try {
      const response = await api.get<AchievementDto[]>(
        `/api/achievements/character/${characterId}/completed`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar conquistas completadas:', error);
      throw error;
    }
  }

  /**
   * Lista conquistas em progresso
   * @param characterId - ID do personagem
   * @returns Array de conquistas em progresso
   */
  async getInProgressAchievements(characterId: number): Promise<AchievementDto[]> {
    try {
      const response = await api.get<AchievementDto[]>(
        `/api/achievements/character/${characterId}/in-progress`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar conquistas em progresso:', error);
      throw error;
    }
  }

  /**
   * Lista conquistas recentemente desbloqueadas
   * @param characterId - ID do personagem
   * @returns Array de conquistas recentes (ordenadas por data)
   */
  async getRecentAchievements(characterId: number): Promise<AchievementDto[]> {
    try {
      const response = await api.get<AchievementDto[]>(
        `/api/achievements/character/${characterId}/recent`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar conquistas recentes:', error);
      throw error;
    }
  }

  /**
   * Obtém o percentual de conclusão de conquistas
   * @param characterId - ID do personagem
   * @returns Estatísticas de conclusão
   */
  async getCompletionPercentage(characterId: number): Promise<AchievementCompletionResponse> {
    try {
      const response = await api.get<AchievementCompletionResponse>(
        `/api/achievements/character/${characterId}/completion`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar percentual de conquistas:', error);
      throw error;
    }
  }

  /**
   * Enriquece uma conquista com metadados e informações calculadas
   * @param achievement - Conquista da API
   * @returns Conquista enriquecida
   */
  enrichAchievementInfo(achievement: AchievementDto): AchievementInfo {
    const metadata = ACHIEVEMENT_METADATA[achievement.type];
    const percentComplete = metadata.targetValue > 0
      ? (achievement.progress / metadata.targetValue) * 100
      : 0;
    const unlockedDate = achievement.unlockedAt 
      ? new Date(achievement.unlockedAt) 
      : null;

    return {
      ...achievement,
      metadata,
      percentComplete,
      unlockedDate
    };
  }

  /**
   * Agrupa conquistas por categoria
   * @param achievements - Array de conquistas
   * @returns Conquistas agrupadas por categoria
   */
  groupByCategory(achievements: AchievementDto[]): AchievementsByCategory[] {
    const enriched = achievements.map(a => this.enrichAchievementInfo(a));
    
    const categories = Object.values(AchievementCategory);
    
    return categories.map(category => {
      const categoryAchievements = enriched.filter(
        a => a.metadata.category === category
      );
      
      const completedCount = categoryAchievements.filter(a => a.isCompleted).length;

      return {
        category,
        categoryLabel: CATEGORY_LABELS[category],
        categoryIcon: CATEGORY_ICONS[category],
        achievements: categoryAchievements,
        completedCount,
        totalCount: categoryAchievements.length
      };
    });
  }

  /**
   * Filtra conquistas recentes (últimas 24 horas)
   * @param achievements - Array de conquistas
   * @returns Conquistas desbloqueadas nas últimas 24h
   */
  filterRecentUnlocked(achievements: AchievementDto[]): AchievementDto[] {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    return achievements.filter(a => {
      if (!a.unlockedAt || !a.isCompleted) return false;
      const unlockedDate = new Date(a.unlockedAt);
      return unlockedDate > oneDayAgo;
    });
  }

  /**
   * Ordena conquistas por prioridade (completadas primeiro, depois por progresso)
   * @param achievements - Array de conquistas
   * @returns Array ordenado
   */
  sortByCompletion(achievements: AchievementDto[]): AchievementDto[] {
    return [...achievements].sort((a, b) => {
      // Completadas por último
      if (a.isCompleted && !b.isCompleted) return 1;
      if (!a.isCompleted && b.isCompleted) return -1;

      // Entre não completadas, ordenar por progresso (maior primeiro)
      const metaA = ACHIEVEMENT_METADATA[a.type];
      const metaB = ACHIEVEMENT_METADATA[b.type];
      const percentA = (a.progress / metaA.targetValue) * 100;
      const percentB = (b.progress / metaB.targetValue) * 100;

      return percentB - percentA;
    });
  }

  /**
   * Verifica se uma conquista está próxima de ser desbloqueada
   * @param achievement - Conquista
   * @param threshold - Porcentagem mínima (padrão: 80%)
   * @returns true se está quase completa
   */
  isNearCompletion(achievement: AchievementDto, threshold: number = 80): boolean {
    const metadata = ACHIEVEMENT_METADATA[achievement.type];
    const percent = (achievement.progress / metadata.targetValue) * 100;
    return percent >= threshold && percent < 100;
  }

  /**
   * Formata a mensagem de progresso de uma conquista
   * @param achievement - Conquista
   * @returns String formatada
   */
  formatProgressMessage(achievement: AchievementDto): string {
    const metadata = ACHIEVEMENT_METADATA[achievement.type];
    const { progress } = achievement;
    const { targetValue } = metadata;
    const percent = ((progress / targetValue) * 100).toFixed(1);

    if (achievement.isCompleted) {
      return `✅ Completado em ${this.formatDate(achievement.unlockedAt!)}`;
    }

    return `${progress}/${targetValue} (${percent}%)`;
  }

  /**
   * Formata uma data de desbloqueio
   * @param dateString - String ISO da data
   * @returns Data formatada
   */
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  /**
   * Obtém conquistas próximas de serem desbloqueadas (>80% progresso)
   * @param achievements - Array de conquistas
   * @returns Conquistas quase completas
   */
  getAlmostCompleted(achievements: AchievementDto[]): AchievementInfo[] {
    return achievements
      .filter(a => !a.isCompleted && this.isNearCompletion(a))
      .map(a => this.enrichAchievementInfo(a))
      .sort((a, b) => b.percentComplete - a.percentComplete);
  }

  /**
   * Calcula estatísticas gerais de conquistas
   * @param achievements - Array de conquistas
   * @returns Estatísticas
   */
  calculateStats(achievements: AchievementDto[]): {
    total: number;
    completed: number;
    inProgress: number;
    notStarted: number;
    percentage: number;
  } {
    const total = achievements.length;
    const completed = achievements.filter(a => a.isCompleted).length;
    const inProgress = achievements.filter(a => !a.isCompleted && a.progress > 0).length;
    const notStarted = achievements.filter(a => a.progress === 0).length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;

    return {
      total,
      completed,
      inProgress,
      notStarted,
      percentage
    };
  }
}

export const achievementService = new AchievementService();
export default achievementService;
