import React, { useState, useEffect } from 'react';
import { useGame } from '../../../../contexts';
import { questService } from '../../../../services';
import type { QuestInfo } from '../../../../types';
import {
  TrackerContainer,
  TrackerHeader,
  TrackerTitle,
  ToggleButton,
  QuestList,
  QuestItem,
  QuestItemHeader,
  QuestItemTitle,
  QuestProgress,
  ProgressBarMini,
  ProgressFillMini,
  ProgressTextMini,
  EmptyMessage,
  CollapsedIndicator
} from './QuestTracker.styles';

interface QuestTrackerProps {
  characterId?: number; // Agora é opcional, pega do contexto se não fornecido
  maxQuests?: number;
  collapsible?: boolean;
  initialCollapsed?: boolean;
}

/**
 * Componente: "Tracker de Missões" (HUD)
 * Exibe um resumo das missões ativas no canto da tela
 */
export const QuestTracker: React.FC<QuestTrackerProps> = ({
  characterId: propCharacterId,
  maxQuests = 5,
  collapsible = true,
  initialCollapsed = false
}) => {
  const { player } = useGame();
  const characterId = propCharacterId || player?.id;
  const [activeQuests, setActiveQuests] = useState<QuestInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  /**
   * Carrega quests ativas
   */
  const loadActiveQuests = async () => {
    if (!characterId) return;

    setLoading(true);

    try {
      // API: Chamada otimizada - busca apenas quests ativas
      const data = await questService.getActiveQuests(characterId);

      // Limita ao número máximo de quests exibidas
      const limitedQuests = data.slice(0, maxQuests);

      // Helper: Enriquece com informações de UI
      const enrichedQuests = limitedQuests.map(quest =>
        questService.enrichQuestInfo(quest)
      );

      setActiveQuests(enrichedQuests);
    } catch (err) {
      console.error('Erro ao carregar quests ativas:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Carrega quests ao montar e atualiza periodicamente
   */
  useEffect(() => {
    loadActiveQuests();

    // Atualiza a cada 30 segundos (opcional)
    const interval = setInterval(loadActiveQuests, 30000);

    return () => clearInterval(interval);
  }, [characterId]);

  /**
   * Toggle do estado collapsed
   */
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Não renderiza se não houver personagem
  if (!characterId) return null;

  return (
    <TrackerContainer $collapsed={isCollapsed}>
      <TrackerHeader onClick={collapsible ? handleToggle : undefined}>
        <TrackerTitle>
          📌 Missões Ativas {activeQuests.length > 0 && `(${activeQuests.length})`}
        </TrackerTitle>
        {collapsible && (
          <ToggleButton $collapsed={isCollapsed}>
            {isCollapsed ? '▼' : '▲'}
          </ToggleButton>
        )}
      </TrackerHeader>

      {!isCollapsed && (
        <>
          {loading && activeQuests.length === 0 ? (
            <EmptyMessage>Carregando...</EmptyMessage>
          ) : activeQuests.length === 0 ? (
            <EmptyMessage>
              Nenhuma missão ativa.
              <br />
              <small>Visite o Mural de Missões!</small>
            </EmptyMessage>
          ) : (
            <QuestList>
              {activeQuests.map(quest => (
                <QuestItem key={quest.id}>
                  <QuestItemHeader>
                    <QuestItemTitle
                      nearComplete={questService.isNearCompletion(quest)}
                    >
                      {quest.typeIcon} {quest.title}
                    </QuestItemTitle>
                  </QuestItemHeader>

                  <QuestProgress>
                    {/* Helper: Usa formatProgressMessage para exibir progresso amigável */}
                    <ProgressTextMini
                      nearComplete={questService.isNearCompletion(quest)}
                    >
                      {questService.formatProgressMessage(quest)}
                    </ProgressTextMini>

                    {/* Barra de progresso mini */}
                    <ProgressBarMini>
                      <ProgressFillMini
                        percent={quest.percentComplete}
                        nearComplete={questService.isNearCompletion(quest)}
                        completed={quest.isCompleted}
                      />
                    </ProgressBarMini>
                  </QuestProgress>
                </QuestItem>
              ))}
            </QuestList>
          )}
        </>
      )}

      {isCollapsed && activeQuests.length > 0 && (
        <CollapsedIndicator>
          {activeQuests.length} missão{activeQuests.length > 1 ? 'ões' : ''} em andamento
        </CollapsedIndicator>
      )}
    </TrackerContainer>
  );
};

export default QuestTracker;
