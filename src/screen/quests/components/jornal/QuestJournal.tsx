import React, { useState, useEffect, useMemo } from 'react';
import { useGame } from '../../../../contexts';
import { questService } from '../../../../services';
import type { QuestInfo } from '../../../../types';
import {
  JournalOverlay,
  JournalContainer,
  JournalHeader,
  JournalTitle,
  HeaderCloseButton,
  TabContainer,
  Tab,
  QuestListContainer,
  QuestCard,
  QuestHeader,
  QuestTitle,
  QuestType as QuestTypeTag,
  QuestBody,
  QuestDescription,
  ProgressBar,
  ProgressFill,
  ProgressText,
  RewardSection,
  RewardItem,
  ActionButton,
  EmptyState,
  LoadingState
} from './QuestJournal.styles';

type TabType = 'active' | 'completed' | 'all';

interface QuestJournalProps {
  characterId?: number;
  onClose?: () => void;
}

/**
 * Tela: "Diário de Missões"
 * Exibe todas as quests do jogador com sistema de abas para filtrar
 */
export const QuestJournal: React.FC<QuestJournalProps> = ({ 
  characterId: propCharacterId,
  onClose 
}) => {
  const { player } = useGame();
  const characterId = propCharacterId || player?.id;
  const [selectedTab, setSelectedTab] = useState<TabType>('active');
  const [quests, setQuests] = useState<QuestInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega todas as quests ao montar o componente
   */
  const loadQuests = async () => {
    if (!characterId) return;

    setLoading(true);
    setError(null);

    try {
      // API: Busca todos os dados de uma vez
      const data = await questService.getAllQuests(characterId);

      // Helper: Enriquece cada quest com informações de UI
      const enrichedQuests: QuestInfo[] = data.map(quest => 
        questService.enrichQuestInfo(quest)
      );

      // Helper: Ordena por prioridade (ativas primeiro)
      const sortedQuests: QuestInfo[] = questService.sortQuestsByPriority(enrichedQuests) as QuestInfo[];

      setQuests(sortedQuests);
    } catch (err) {
      setError('Erro ao carregar missões. Tente novamente.');
      console.error('Erro ao carregar quests:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Carrega quests ao montar o componente
   */
  useEffect(() => {
    loadQuests();
  }, [characterId]);

  /**
   * Helper: Filtra quests baseado na aba selecionada
   */
  const filteredQuests = useMemo(() => {
    return questService.filterQuests(quests, selectedTab) as QuestInfo[];
  }, [quests, selectedTab]);

  /**
   * API: Abandona uma quest ativa
   */
  const handleAbandonQuest = async (questId: number) => {
    if (!characterId) return;

    const confirmed = window.confirm(
      'Tem certeza que deseja abandonar esta missão? Seu progresso será perdido.'
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      await questService.abandonQuest(questId, characterId);
      
      // Re-busca os dados para atualizar a tela
      await loadQuests();
      
      alert('Missão abandonada com sucesso!');
    } catch (err) {
      console.error('Erro ao abandonar quest:', err);
      alert('Erro ao abandonar missão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Renderiza o conteúdo baseado no estado
   */
  const renderContent = () => {
    if (loading) {
      return <LoadingState>Carregando missões...</LoadingState>;
    }

    if (error) {
      return <EmptyState>{error}</EmptyState>;
    }

    if (filteredQuests.length === 0) {
      return (
        <EmptyState>
          {selectedTab === 'active' && 'Você não tem missões ativas no momento.'}
          {selectedTab === 'completed' && 'Você ainda não completou nenhuma missão.'}
          {selectedTab === 'all' && 'Nenhuma missão disponível.'}
        </EmptyState>
      );
    }

    return (
      <QuestListContainer>
        {filteredQuests.map((quest: QuestInfo) => (
          <QuestCard key={quest.id} status={quest.status}>
            <QuestHeader>
              <div>
                <QuestTitle>{quest.title}</QuestTitle>
                <QuestTypeTag>{quest.typeIcon} {quest.typeLabel}</QuestTypeTag>
              </div>
              {quest.isActive && (
                <ActionButton
                  variant="danger"
                  onClick={() => handleAbandonQuest(quest.id)}
                >
                  Abandonar
                </ActionButton>
              )}
            </QuestHeader>

            <QuestBody>
              <QuestDescription>{quest.description}</QuestDescription>

              {/* Barra de progresso */}
              {(quest.isActive || quest.isCompleted) && (
                <div>
                  <ProgressBar>
                    <ProgressFill 
                      percent={quest.percentComplete}
                      isNearComplete={questService.isNearCompletion(quest)}
                    />
                  </ProgressBar>
                  <ProgressText>
                    {questService.formatProgressMessage(quest)}
                  </ProgressText>
                </div>
              )}

              {/* Recompensas */}
              <RewardSection>
                <RewardItem>
                  <span>⭐</span> {quest.xpReward} XP
                </RewardItem>
                {quest.goldReward > 0 && (
                  <RewardItem>
                    <span>💰</span> {quest.goldReward} Ouro
                  </RewardItem>
                )}
              </RewardSection>
            </QuestBody>
          </QuestCard>
        ))}
      </QuestListContainer>
    );
  };

  return (
    <JournalOverlay>
      <JournalContainer>
        {onClose && (
          <HeaderCloseButton onClick={onClose} title="Fechar Diário">
            ✕
          </HeaderCloseButton>
        )}
        <JournalHeader>
          <JournalTitle>📖 Diário de Missões</JournalTitle>
        </JournalHeader>

        {/* Sistema de Abas */}
        <TabContainer>
          <Tab
            active={selectedTab === 'active'}
            onClick={() => setSelectedTab('active')}
          >
            Ativas ({quests.filter(q => q.isActive).length})
          </Tab>
          <Tab
            active={selectedTab === 'completed'}
            onClick={() => setSelectedTab('completed')}
          >
            Completas ({quests.filter(q => q.isCompleted).length})
          </Tab>
          <Tab
            active={selectedTab === 'all'}
            onClick={() => setSelectedTab('all')}
          >
            Todas ({quests.length})
          </Tab>
        </TabContainer>

        {/* Conteúdo */}
        {renderContent()}
      </JournalContainer>
    </JournalOverlay>
  );
};

export default QuestJournal;
