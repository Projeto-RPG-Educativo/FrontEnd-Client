import React, { useState, useEffect } from 'react';
import { useGame } from '../../../../contexts';
import { questService } from '../../../../services';
import type { QuestInfo } from '../../../../types';
import {
  BoardOverlay,
  BoardContainer,
  BoardHeader,
  BoardTitle,
  HeaderCloseButton,
  QuestGrid,
  QuestCard,
  QuestIcon,
  QuestTitle,
  QuestDifficulty,
  QuestRewards,
  RewardBadge,
  ViewDetailsButton,
  LoadingState,
  EmptyState,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  QuestDetailSection,
  SectionTitle,
  QuestDescription,
  ProgressInfo,
  RewardsList,
  RewardItem,
  ModalFooter,
  AcceptButton,
  CancelButton
} from './QuestBoard.styles';

interface QuestBoardProps {
  characterId?: number;
  onClose?: () => void;
}

/**
 * Tela: "Mural de Missões"
 * Exibe apenas as quests disponíveis para o jogador aceitar
 */
export const QuestBoard: React.FC<QuestBoardProps> = ({ 
  characterId: propCharacterId,
  onClose 
}) => {
  const { player } = useGame();
  const characterId = propCharacterId || player?.id;
  const [availableQuests, setAvailableQuests] = useState<QuestInfo[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<QuestInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega quests disponíveis
   */
  const loadAvailableQuests = async () => {
    if (!characterId) return;

    setLoading(true);
    setError(null);

    try {
      // API: Busca todas as quests
      const allQuests = await questService.getAllQuests(characterId);

      // Helper: Filtra apenas as disponíveis
      const available = questService.filterQuests(allQuests, 'available');

      // Helper: Enriquece com informações de UI
      const enrichedQuests = available.map(quest =>
        questService.enrichQuestInfo(quest)
      );

      setAvailableQuests(enrichedQuests);
    } catch (err) {
      setError('Erro ao carregar missões disponíveis.');
      console.error('Erro ao carregar quests:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Carrega quests ao montar o componente
   */
  useEffect(() => {
    loadAvailableQuests();
  }, [characterId]);

  /**
   * Abre modal de detalhes da quest
   */
  const handleViewDetails = (quest: QuestInfo) => {
    setSelectedQuest(quest);
  };

  /**
   * Fecha modal de detalhes
   */
  const handleCloseModal = () => {
    setSelectedQuest(null);
  };

  /**
   * API: Aceita uma quest
   */
  const handleAcceptQuest = async (questId: number) => {
    if (!characterId) return;

    try {
      setLoading(true);

      // API: Aceita a quest
      const response = await questService.acceptQuest(questId, characterId);

      alert(`✅ ${response.message}\n\nMissão "${response.questTitle}" aceita!`);

      // Fecha o modal
      handleCloseModal();

      // Re-busca os dados para atualizar a lista
      await loadAvailableQuests();
    } catch (err) {
      console.error('Erro ao aceitar quest:', err);
      alert('Erro ao aceitar missão. Você pode já ter atingido o limite de missões ativas.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Calcula a dificuldade baseada na recompensa de XP
   */
  const getDifficulty = (xpReward: number): string => {
    if (xpReward >= 1000) return 'Difícil';
    if (xpReward >= 500) return 'Média';
    return 'Fácil';
  };

  /**
   * Renderiza o conteúdo baseado no estado
   */
  const renderContent = () => {
    if (loading && availableQuests.length === 0) {
      return <LoadingState>Carregando missões disponíveis...</LoadingState>;
    }

    if (error) {
      return <EmptyState>{error}</EmptyState>;
    }

    if (availableQuests.length === 0) {
      return (
        <EmptyState>
          📭 Nenhuma missão disponível no momento.
          <br />
          <small>Complete suas missões ativas ou volte mais tarde!</small>
        </EmptyState>
      );
    }

    return (
      <QuestGrid>
        {availableQuests.map(quest => (
          <QuestCard key={quest.id}>
            <QuestIcon>{quest.typeIcon}</QuestIcon>
            <QuestTitle>{quest.title}</QuestTitle>
            <QuestDifficulty difficulty={getDifficulty(quest.xpReward)}>
              {getDifficulty(quest.xpReward)}
            </QuestDifficulty>
            <QuestRewards>
              <RewardBadge>⭐ {quest.xpReward} XP</RewardBadge>
              {quest.goldReward > 0 && (
                <RewardBadge>💰 {quest.goldReward}</RewardBadge>
              )}
            </QuestRewards>
            <ViewDetailsButton onClick={() => handleViewDetails(quest)}>
              Ver Detalhes
            </ViewDetailsButton>
          </QuestCard>
        ))}
      </QuestGrid>
    );
  };

  return (
    <>
      <BoardOverlay>
        <BoardContainer>
          {onClose && (
            <HeaderCloseButton onClick={onClose} title="Fechar Mural">
              ✕
            </HeaderCloseButton>
          )}
          <BoardHeader>
            <BoardTitle>📋 Mural de Missões</BoardTitle>
            <p>Escolha uma missão para começar sua jornada!</p>
          </BoardHeader>

          {renderContent()}
        </BoardContainer>
      </BoardOverlay>

      {/* Modal de Detalhes da Quest */}
      {selectedQuest && (
        <Modal>
          <ModalOverlay onClick={handleCloseModal} />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {selectedQuest.typeIcon} {selectedQuest.title}
              </ModalTitle>
              <CloseButton onClick={handleCloseModal}>✕</CloseButton>
            </ModalHeader>

            <ModalBody>
              {/* Descrição */}
              <QuestDetailSection>
                <SectionTitle>📖 Descrição</SectionTitle>
                <QuestDescription>{selectedQuest.description}</QuestDescription>
              </QuestDetailSection>

              {/* Tipo e Objetivo */}
              <QuestDetailSection>
                <SectionTitle>🎯 Objetivo</SectionTitle>
                <ProgressInfo>
                  <strong>Tipo:</strong> {selectedQuest.typeLabel}
                </ProgressInfo>
                <ProgressInfo>
                  <strong>Meta:</strong> {selectedQuest.targetValue} {' '}
                  {selectedQuest.targetName && `(${selectedQuest.targetName})`}
                </ProgressInfo>
              </QuestDetailSection>

              {/* Recompensas */}
              <QuestDetailSection>
                <SectionTitle>🎁 Recompensas</SectionTitle>
                <RewardsList>
                  <RewardItem>
                    <span>⭐</span>
                    <div>
                      <strong>{selectedQuest.xpReward} XP</strong>
                      <small>Experiência</small>
                    </div>
                  </RewardItem>
                  {selectedQuest.goldReward > 0 && (
                    <RewardItem>
                      <span>💰</span>
                      <div>
                        <strong>{selectedQuest.goldReward} Ouro</strong>
                        <small>Moedas</small>
                      </div>
                    </RewardItem>
                  )}
                </RewardsList>
              </QuestDetailSection>
            </ModalBody>

            <ModalFooter>
              <CancelButton onClick={handleCloseModal}>
                Cancelar
              </CancelButton>
              <AcceptButton
                onClick={() => handleAcceptQuest(selectedQuest.id)}
                disabled={loading}
              >
                {loading ? 'Aceitando...' : '✓ Aceitar Missão'}
              </AcceptButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default QuestBoard;
