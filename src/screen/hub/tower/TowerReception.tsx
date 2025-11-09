import React, { useState } from 'react';
import { useQuest } from '../../../hooks/services';
import { useGameContext } from '../../../contexts/GameContext';
import type { QuestInfo } from '../../../types/dto/Quest';
import * as S from './TowerReception.styles';

interface TowerReceptionProps {
  onClose: () => void;
}

type FilterTab = 'all' | 'available' | 'active' | 'completed';

export const TowerReception: React.FC<TowerReceptionProps> = ({ onClose }) => {
  const { character } = useGameContext();
  const {
    quests,
    activeQuest,
    availableQuests,
    completedQuests,
    loading,
    error,
    acceptQuest,
    abandonQuest,
    refreshQuests
  } = useQuest(character?.id || null);

  const [selectedTab, setSelectedTab] = useState<FilterTab>('all');
  const [processingQuestId, setProcessingQuestId] = useState<number | null>(null);

  // Filtra quests baseado na aba selecionada
  const getFilteredQuests = (): QuestInfo[] => {
    switch (selectedTab) {
      case 'available':
        return availableQuests;
      case 'active':
        return activeQuest ? [activeQuest] : [];
      case 'completed':
        return completedQuests;
      case 'all':
      default:
        return quests;
    }
  };

  // Handler para aceitar quest
  const handleAcceptQuest = async (questId: number) => {
    setProcessingQuestId(questId);
    try {
      const response = await acceptQuest(questId);
      if (response) {
        // Aqui você pode adicionar um toast/notificação
        console.log(response.message);
      }
    } catch (err) {
      console.error('Erro ao aceitar quest:', err);
    } finally {
      setProcessingQuestId(null);
    }
  };

  // Handler para abandonar quest
  const handleAbandonQuest = async (questId: number) => {
    if (!window.confirm('Tem certeza que deseja abandonar esta quest? Todo o progresso será perdido.')) {
      return;
    }

    setProcessingQuestId(questId);
    try {
      const success = await abandonQuest(questId);
      if (success) {
        console.log('Quest abandonada com sucesso');
      }
    } catch (err) {
      console.error('Erro ao abandonar quest:', err);
    } finally {
      setProcessingQuestId(null);
    }
  };

  // Renderiza o card de quest
  const renderQuestCard = (quest: QuestInfo) => {
    const status = quest.isActive ? 'active' : quest.isCompleted ? 'completed' : 'available';
    const isProcessing = processingQuestId === quest.id;

    return (
      <S.QuestCard key={quest.id} $status={status}>
        {/* Header do Card */}
        <S.QuestHeader>
          <S.QuestIcon>{quest.typeIcon}</S.QuestIcon>
          <S.QuestTitle>{quest.title}</S.QuestTitle>
          <S.QuestType>{quest.typeLabel}</S.QuestType>
        </S.QuestHeader>

        {/* Descrição */}
        <S.QuestDescription>{quest.description}</S.QuestDescription>

        {/* Barra de Progresso (apenas se estiver ativa ou completa) */}
        {(quest.isActive || quest.isCompleted) && (
          <>
            <S.QuestProgressBar>
              <S.ProgressFill $percent={quest.percentComplete} />
            </S.QuestProgressBar>
            <S.QuestProgressText>
              {quest.progress}/{quest.targetValue} ({quest.percentComplete.toFixed(1)}%)
            </S.QuestProgressText>
          </>
        )}

        {/* Recompensas */}
        <S.QuestRewards>
          <S.RewardItem>
            <S.RewardIcon>⭐</S.RewardIcon>
            {quest.xpReward} XP
          </S.RewardItem>
          <S.RewardItem>
            <S.RewardIcon>💰</S.RewardIcon>
            {quest.goldReward} Gold
          </S.RewardItem>
        </S.QuestRewards>

        {/* Botões de Ação */}
        <S.QuestActions>
          {quest.isAvailable && (
            <S.ActionButton
              $variant="accept"
              onClick={() => handleAcceptQuest(quest.id)}
              disabled={isProcessing || !!activeQuest}
            >
              {isProcessing ? 'Aceitando...' : 'Aceitar Quest'}
            </S.ActionButton>
          )}

          {quest.isActive && (
            <S.ActionButton
              $variant="abandon"
              onClick={() => handleAbandonQuest(quest.id)}
              disabled={isProcessing}
            >
              {isProcessing ? 'Abandonando...' : 'Abandonar'}
            </S.ActionButton>
          )}

          {quest.isCompleted && (
            <S.ActionButton $variant="info" disabled>
              ✅ Completada
            </S.ActionButton>
          )}
        </S.QuestActions>

        {/* Informação de monstro alvo (se aplicável) */}
        {quest.targetName && (
          <S.QuestDescription style={{ marginTop: '10px', fontSize: '12px' }}>
            🎯 Alvo: <strong>{quest.targetName}</strong>
          </S.QuestDescription>
        )}
      </S.QuestCard>
    );
  };

  const filteredQuests = getFilteredQuests();

  return (
    <S.ReceptionContainer onClick={onClose}>
      <S.BookContainer onClick={(e) => e.stopPropagation()}>
        {/* Botão de Fechar */}
        <S.CloseButton onClick={onClose}>✕</S.CloseButton>

        {/* PÁGINA ESQUERDA - Ilustração e Boas-vindas */}
        <S.LeftPage>
          <S.IllustrationArea />
          
          <S.WelcomeText>
            <S.WelcomeTitle>Torre do Conhecimento</S.WelcomeTitle>
            <S.WelcomeSubtitle>
              Bem-vindo, {character?.name || 'Aventureiro'}! 
              A recepcionista oferece missões desafiadoras que testam suas habilidades 
              e conhecimento. Complete-as para ganhar recompensas valiosas!
            </S.WelcomeSubtitle>
          </S.WelcomeText>

          {/* Estatísticas */}
          <S.StatsBox>
            <S.StatItem>
              <S.StatLabel>📜 Total de Quests:</S.StatLabel>
              <S.StatValue>{quests.length}</S.StatValue>
            </S.StatItem>
            <S.StatItem>
              <S.StatLabel>⚡ Quest Ativa:</S.StatLabel>
              <S.StatValue>{activeQuest ? '1' : '0'} / 1</S.StatValue>
            </S.StatItem>
            <S.StatItem>
              <S.StatLabel>✅ Completadas:</S.StatLabel>
              <S.StatValue>{completedQuests.length}</S.StatValue>
            </S.StatItem>
            <S.StatItem>
              <S.StatLabel>🎯 Disponíveis:</S.StatLabel>
              <S.StatValue>{availableQuests.length}</S.StatValue>
            </S.StatItem>
          </S.StatsBox>
        </S.LeftPage>

        {/* PÁGINA DIREITA - Lista de Quests */}
        <S.RightPage>
          <S.PageHeader>
            <S.PageTitle>Missões Disponíveis</S.PageTitle>
            <S.PageSubtitle>Escolha uma missão para embarcar em sua jornada</S.PageSubtitle>
          </S.PageHeader>

          {/* Abas de Filtro */}
          <S.TabsContainer>
            <S.TabButton
              $isActive={selectedTab === 'all'}
              onClick={() => setSelectedTab('all')}
            >
              Todas ({quests.length})
            </S.TabButton>
            <S.TabButton
              $isActive={selectedTab === 'available'}
              onClick={() => setSelectedTab('available')}
            >
              Disponíveis ({availableQuests.length})
            </S.TabButton>
            <S.TabButton
              $isActive={selectedTab === 'active'}
              onClick={() => setSelectedTab('active')}
            >
              Ativa ({activeQuest ? 1 : 0})
            </S.TabButton>
            <S.TabButton
              $isActive={selectedTab === 'completed'}
              onClick={() => setSelectedTab('completed')}
            >
              Completas ({completedQuests.length})
            </S.TabButton>
          </S.TabsContainer>

          {/* Lista de Quests */}
          {loading ? (
            <S.LoadingContainer>
              <S.LoadingSpinner />
              <S.LoadingText>Carregando missões...</S.LoadingText>
            </S.LoadingContainer>
          ) : error ? (
            <S.ErrorContainer>
              <S.ErrorIcon>❌</S.ErrorIcon>
              <S.ErrorText>{error}</S.ErrorText>
              <S.RetryButton onClick={refreshQuests}>Tentar Novamente</S.RetryButton>
            </S.ErrorContainer>
          ) : filteredQuests.length === 0 ? (
            <S.EmptyState>
              <S.EmptyIcon>📭</S.EmptyIcon>
              <S.EmptyText>
                {selectedTab === 'available' && 'Nenhuma missão disponível no momento.'}
                {selectedTab === 'active' && 'Você não possui nenhuma missão ativa.'}
                {selectedTab === 'completed' && 'Você ainda não completou nenhuma missão.'}
                {selectedTab === 'all' && 'Nenhuma missão encontrada.'}
              </S.EmptyText>
            </S.EmptyState>
          ) : (
            <S.QuestList>
              {filteredQuests.map(quest => renderQuestCard(quest))}
            </S.QuestList>
          )}
        </S.RightPage>
      </S.BookContainer>
    </S.ReceptionContainer>
  );
};

export default TowerReception;
