import api from '../api/api';
import type {
  QuestDto,
  AcceptQuestRequest,
  AcceptQuestResponse,
  QuestInfo
} from '../../types/dto/Quest';
import { QuestStatus } from '../../types/dto/Quest';
import { QUEST_TYPE_INFO } from '../../constants/QuestAchievementMetadata';

/**
 * Service para gerenciar quests (missões)
 */
class QuestService {
  /**
   * Lista todas as quests disponíveis para um personagem
   * @param characterId - ID do personagem
   * @returns Array de quests com seus status
   */
  async getAllQuests(characterId: number): Promise<QuestDto[]> {
    try {
      const response = await api.get<QuestDto[]>(
        `/hub/tower/quests?characterId=${characterId}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar quests:', error);
      throw error;
    }
  }

  /**
   * Lista apenas as quests ativas do personagem
   * @param characterId - ID do personagem
   * @returns Array de quests em progresso
   */
  async getActiveQuests(characterId: number): Promise<QuestDto[]> {
    try {
      const response = await api.get<QuestDto[]>(
        `/hub/tower/quests/active?characterId=${characterId}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar quests ativas:', error);
      throw error;
    }
  }

  /**
   * Aceita uma quest para o personagem
   * @param questId - ID da quest
   * @param characterId - ID do personagem
   * @returns Resposta de confirmação
   */
  async acceptQuest(
    questId: number,
    characterId: number
  ): Promise<AcceptQuestResponse> {
    try {
      const request: AcceptQuestRequest = {
        questId,
        characterId
      };

      const response = await api.post<AcceptQuestResponse>(
        '/hub/tower/quests/accept',
        request
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao aceitar quest:', error);
      throw error;
    }
  }

  /**
   * Abandona uma quest ativa
   * @param questId - ID da quest
   * @param characterId - ID do personagem
   * @returns Mensagem de confirmação
   */
  async abandonQuest(questId: number, characterId: number): Promise<string> {
    try {
      const response = await api.delete<string>(
        `/hub/tower/quests/${questId}/abandon?characterId=${characterId}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao abandonar quest:', error);
      throw error;
    }
  }

  /**
   * Enriquece um QuestDto com informações adicionais para UI
   * @param quest - Quest básica da API
   * @returns Quest com informações de UI
   */
  enrichQuestInfo(quest: QuestDto): QuestInfo {
    const typeInfo = QUEST_TYPE_INFO[quest.type];
    const percentComplete = quest.targetValue > 0 
      ? (quest.progress / quest.targetValue) * 100 
      : 0;

    return {
      ...quest,
      percentComplete,
      isActive: quest.status === QuestStatus.IN_PROGRESS,
      isCompleted: quest.status === QuestStatus.COMPLETED,
      isAvailable: quest.status === null || quest.status === QuestStatus.AVAILABLE,
      typeIcon: typeInfo.icon,
      typeLabel: typeInfo.label
    };
  }

  /**
   * Filtra quests por status
   * @param quests - Array de quests
   * @param filterType - Tipo de filtro
   * @returns Quests filtradas
   */
  filterQuests(
    quests: QuestDto[],
    filterType: 'available' | 'active' | 'completed' | 'all'
  ): QuestDto[] {
    switch (filterType) {
      case 'available':
        return quests.filter(q => q.status === null);
      case 'active':
        return quests.filter(q => q.status === QuestStatus.IN_PROGRESS);
      case 'completed':
        return quests.filter(q => q.status === QuestStatus.COMPLETED);
      case 'all':
      default:
        return quests;
    }
  }

  /**
   * Formata a mensagem de progresso de uma quest
   * @param quest - Quest
   * @returns String formatada
   */
  formatProgressMessage(quest: QuestDto): string {
    const { progress, targetValue, type } = quest;
    const percent = ((progress / targetValue) * 100).toFixed(1);

    switch (type) {
      case 'ANSWER_QUESTIONS':
        return `${progress}/${targetValue} perguntas acertadas (${percent}%)`;
      case 'DEFEAT_MONSTER':
        return `${progress}/${targetValue} ${quest.targetName || 'monstros'} derrotados (${percent}%)`;
      case 'WIN_BATTLES':
        return `${progress}/${targetValue} batalhas vencidas (${percent}%)`;
      case 'REACH_LEVEL':
        return `Nível ${progress}/${targetValue} (${percent}%)`;
      case 'DEAL_DAMAGE':
        return `${progress}/${targetValue} de dano causado (${percent}%)`;
      default:
        return `${progress}/${targetValue} (${percent}%)`;
    }
  }

  /**
   * Verifica se uma quest está próxima de ser completada
   * @param quest - Quest
   * @param threshold - Porcentagem mínima (padrão: 80%)
   * @returns true se está quase completa
   */
  isNearCompletion(quest: QuestDto, threshold: number = 80): boolean {
    const percent = (quest.progress / quest.targetValue) * 100;
    return percent >= threshold && percent < 100;
  }

  /**
   * Ordena quests por prioridade (ativas primeiro, depois disponíveis, depois completadas)
   * @param quests - Array de quests
   * @returns Array ordenado
   */
  sortQuestsByPriority(quests: QuestDto[]): QuestDto[] {
    return [...quests].sort((a, b) => {
      // Prioridade 1: Ativas
      if (a.status === QuestStatus.IN_PROGRESS && b.status !== QuestStatus.IN_PROGRESS) {
        return -1;
      }
      if (b.status === QuestStatus.IN_PROGRESS && a.status !== QuestStatus.IN_PROGRESS) {
        return 1;
      }

      // Prioridade 2: Disponíveis
      if (a.status === null && b.status === QuestStatus.COMPLETED) {
        return -1;
      }
      if (b.status === null && a.status === QuestStatus.COMPLETED) {
        return 1;
      }

      // Ordenar por recompensa de XP (maior primeiro)
      return b.xpReward - a.xpReward;
    });
  }
}

export const questService = new QuestService();
export default questService;
