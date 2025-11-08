/**
 * ============================================
 * TUTORIAL CUTSCENE COMPONENT
 * ============================================
 * Componente isolado que exibe cutscenes do tutorial.
 * Carrega diálogos da API e gerencia navegação entre eles.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useCutscene } from '../../hooks/screen/cutscene/useCutscene';
import { useTutorial } from '../../contexts';
import { SPOTLIGHT_CONFIGS } from '../../contexts/TutorialContext';
import type { CutsceneProps } from '../../types/dto/Tutorial.types';
import * as S from './TutorialCutscene.styles';
import goblin from '../../assets/Images/npc/GoblinDaGramatica.png';

const TutorialCutscene: React.FC<CutsceneProps> = ({
  cutscene,
  selectedClass,
  onComplete,
  autoStart = true,
  isOverlay = false,
}) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showAdvanceButton, setShowAdvanceButton] = useState(false);

  // Hook do tutorial para sincronizar com battle steps
  const { currentBattleStepConfig, nextBattleStep } = useTutorial();

  // Carrega diálogos da API
  const { dialogues, isLoading, error } = useCutscene({
    startDialogueId: cutscene.dialogueIds[0],
    totalDialogues: cutscene.dialogueIds.length,
    onComplete,
    autoStart,
  });

  // Verifica se é tutorial de batalha (FIRST_BATTLE usa overlay e tem dialogueIds 7-13)
  const isBattleTutorial = isOverlay && cutscene.dialogueIds.includes(7);
  
  // Verifica se é tutorial do HUB (HUB_EXPLANATION usa overlay e tem dialogueIds 18-22)
  const isHubTutorial = isOverlay && (cutscene.dialogueIds.includes(18) || cutscene.dialogueIds.includes(19) || cutscene.dialogueIds.includes(20) || cutscene.dialogueIds.includes(21) || cutscene.dialogueIds.includes(22));

  // Sincroniza o índice do diálogo com o passo atual do tutorial de batalha
  useEffect(() => {
    if (isBattleTutorial && currentBattleStepConfig && dialogues.length > 0) {
      const dialogueId = currentBattleStepConfig.dialogueId;
      const newIndex = cutscene.dialogueIds.findIndex(id => id === dialogueId);
      
      if (newIndex !== -1 && newIndex !== currentDialogueIndex) {
        console.log(`🎯 [TutorialCutscene] Sincronizando diálogo: ID ${dialogueId} (índice ${newIndex})`);
        setCurrentDialogueIndex(newIndex);
      }
    }
  }, [currentBattleStepConfig, isBattleTutorial, dialogues.length, cutscene.dialogueIds, currentDialogueIndex]);

  // Reset quando cutscene mudar
  useEffect(() => {
    setCurrentDialogueIndex(0);
    setShowAdvanceButton(false);
  }, [cutscene.id]);

  // Auto-start
  useEffect(() => {
    if (autoStart && dialogues.length > 0 && !isLoading) {
      setIsVisible(true);
    }
  }, [autoStart, dialogues.length, isLoading]);

  // Delay para mostrar botão de avançar
  useEffect(() => {
    if (isVisible && dialogues.length > 0) {
      const timer = setTimeout(() => {
        // No tutorial de batalha, verifica se o step atual aguarda ação
        if (isBattleTutorial && currentBattleStepConfig) {
          // Só mostra botão se NÃO estiver aguardando ação do player
          if (!currentBattleStepConfig.waitForAction) {
            setShowAdvanceButton(true);
          } else {
            setShowAdvanceButton(false);
          }
        } else if (!isBattleTutorial) {
          // Fora do tutorial de batalha, sempre mostra
          setShowAdvanceButton(true);
        }
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentDialogueIndex, isVisible, dialogues.length, isBattleTutorial, currentBattleStepConfig]);

  // Handler para avançar diálogo
  const handleAdvance = useCallback(() => {
    // Se for tutorial de batalha, usa o sistema de steps
    if (isBattleTutorial && nextBattleStep) {
      // Se está no step BATTLE_CONCLUSION, finaliza o tutorial de batalha
      if (currentBattleStepConfig?.id === 'BATTLE_CONCLUSION') {
        console.log('🎓 [Tutorial] Finalizando tutorial de batalha, avançando para LORE_EXPLANATION');
        onComplete(); // Chama completeCutscene() do TutorialContext
        return;
      }
      
      // Caso contrário, avança para próximo step
      nextBattleStep();
      return;
    }
    
    // Se não for tutorial de batalha, usa lógica padrão
    if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex(prev => prev + 1);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 300);
    }
  }, [currentDialogueIndex, dialogues.length, onComplete, isBattleTutorial, nextBattleStep, currentBattleStepConfig]);

  // Keyboard navigation (desabilitado para tutorial de batalha)
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isBattleTutorial && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleAdvance();
    }
  }, [handleAdvance, isBattleTutorial]);

  useEffect(() => {
    if (isVisible && !isBattleTutorial) {
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [isVisible, handleKeyPress, isBattleTutorial]);

  // Loading state
  if (isLoading) {
    return (
      <S.CutsceneOverlay $isOverlay={isOverlay}>
        <S.LoadingContainer>
          <S.LoadingText>Carregando...</S.LoadingText>
        </S.LoadingContainer>
      </S.CutsceneOverlay>
    );
  }

  // Error state
  if (error) {
    return (
      <S.CutsceneOverlay $isOverlay={isOverlay}>
        <S.ErrorContainer>
          <S.ErrorText>Erro ao carregar cutscene</S.ErrorText>
          <S.ErrorButton onClick={onComplete}>Continuar</S.ErrorButton>
        </S.ErrorContainer>
      </S.CutsceneOverlay>
    );
  }

  // Empty or invisible state
  if (!isVisible || dialogues.length === 0) {
    return null;
  }

  // Safety check
  if (currentDialogueIndex >= dialogues.length) {
    console.error('❌ [TutorialCutscene] Índice de diálogo inválido');
    return null;
  }

  const currentDialogue = dialogues[currentDialogueIndex];

  // Validation
  if (!currentDialogue || !currentDialogue.speaker) {
    console.error('❌ [TutorialCutscene] Diálogo inválido:', currentDialogue);
    return null;
  }

  // Busca configuração de spotlight para este diálogo (se existir)
  const spotlightConfig = currentDialogue.spotlight || SPOTLIGHT_CONFIGS[currentDialogue.id];
  
  // Debug: Log spotlight config
  if (spotlightConfig) {
    console.log('🔦 [Spotlight] Diálogo ID:', currentDialogue.id, 'Config:', spotlightConfig);
  }

  // Determina imagens dos personagens baseado no speaker
  const getCharacterImage = (speaker: string): string => {
    // Se for o Goblin da Gramática, usa o caminho específico
    if (speaker.toLowerCase().includes('goblin')) {
      return goblin;
    }
    
    // Para outros personagens, usa a classe do player
    const classPrefix = selectedClass || 'guerreiro';
    return `/assets/Images/characters/${classPrefix}/${speaker.toLowerCase()}.png`;
  };

  return (
    <>
      {/* Spotlight - Renderizado separadamente para garantir que apareça */}
      {spotlightConfig && (
        <S.SpotlightOverlay
          $x={spotlightConfig.x}
          $y={spotlightConfig.y}
          $radius={spotlightConfig.radius}
        />
      )}
      
      <S.CutsceneOverlay $isOverlay={isOverlay}>
        <S.CutsceneContainer $backgroundImage={cutscene.background} $isOverlay={isOverlay}>
        {/* Personagens - só mostra em tela cheia (não overlay) */}
        {!isOverlay && (
          <S.CharactersContainer>
            {/* Personagem da esquerda em wrapper arredondado */}
            <S.CharacterImageWrapper $isActive={true} $position="left">
              <S.CharacterImage
                src={getCharacterImage(currentDialogue.speaker)}
                alt={currentDialogue.speaker}
                $isActive={true}
                $position="left"
              />
            </S.CharacterImageWrapper>
          </S.CharactersContainer>
        )}

        {/* Caixa de diálogo */}
        <S.DialogueBox $isBattleTutorial={isBattleTutorial} $isHubTutorial={isHubTutorial}>
          <S.SpeakerNameBox $isBattleTutorial={isBattleTutorial} $isHubTutorial={isHubTutorial}>
            <S.SpeakerName>{currentDialogue.speaker}</S.SpeakerName>
          </S.SpeakerNameBox>
          
          <S.DialogueText $isBattleTutorial={isBattleTutorial} $isHubTutorial={isHubTutorial}>{currentDialogue.content}</S.DialogueText>

          <S.ProgressIndicator>
            {currentDialogueIndex + 1} / {dialogues.length}
          </S.ProgressIndicator>

          {showAdvanceButton && (
            <S.AdvanceButton onClick={handleAdvance}>
              {currentDialogueIndex < dialogues.length - 1 ? '▶ Avançar' : '✓ Finalizar'}
            </S.AdvanceButton>
          )}
        </S.DialogueBox>
      </S.CutsceneContainer>
    </S.CutsceneOverlay>
    </>
  );
};

export default TutorialCutscene;