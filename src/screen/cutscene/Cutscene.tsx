import React, { useState, useEffect, useCallback } from 'react';
import * as S from './Cutscene.styles';

export interface CutsceneDialogue {
  id: number;
  speaker: string;
  content: string;
  spotlight?: {
    x: number;
    y: number;
    radius: number;
  };
}

interface CutsceneProps {
  dialogues: CutsceneDialogue[];
  backgroundImage?: string;
  characterImages?: Record<string, string>;
  onComplete: () => void;
  autoStart?: boolean;
}

const Cutscene: React.FC<CutsceneProps> = ({
  dialogues,
  backgroundImage,
  characterImages = {},
  onComplete,
  autoStart = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showAdvanceButton, setShowAdvanceButton] = useState(false);

  // Reset do índice quando os diálogos mudarem (nova cutscene)
  useEffect(() => {
    setCurrentIndex(0);
    setShowAdvanceButton(false);
  }, [dialogues]);

  useEffect(() => {
    if (autoStart && dialogues.length > 0) {
      setIsVisible(true);
    }
  }, [autoStart, dialogues.length]);

  useEffect(() => {
    const buttonShowDelay = 500;
    const buttonTimer = setTimeout(() => {
      setShowAdvanceButton(true);
    }, buttonShowDelay);

    return () => {
      clearTimeout(buttonTimer);
      setShowAdvanceButton(false);
    };
  }, [currentIndex]);

  const handleAdvance = useCallback(() => {
    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 300);
    }
  }, [currentIndex, dialogues.length, onComplete]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleAdvance();
    }
  }, [handleAdvance]);

  useEffect(() => {
    if (isVisible) {
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [isVisible, handleKeyPress]);

  if (!isVisible || dialogues.length === 0) {
    return null;
  }

  // Proteção contra índice inválido
  if (currentIndex >= dialogues.length) {
    console.error('❌ [Cutscene] Índice de diálogo inválido');
    return null;
  }

  const currentDialogue = dialogues[currentIndex];
  
  // Validação de segurança
  if (!currentDialogue || !currentDialogue.speaker) {
    console.error('❌ [Cutscene] Diálogo inválido');
    return null;
  }

  const activeSpeakerName = currentDialogue.speaker;

  // Pega os nomes dos personagens do objeto characterImages
  const speakerNames = Object.keys(characterImages);
  const leftSpeakerName = speakerNames[0];
  const rightSpeakerName = speakerNames[1];

  const leftImageSrc = characterImages[leftSpeakerName];
  const rightImageSrc = characterImages[rightSpeakerName];

  return (
    <S.CutsceneOverlay>
      <S.CutsceneContainer $backgroundImage={backgroundImage}>
        {/* Container para os personagens na parte superior */}
        <S.TopCharactersContainer>
          {leftImageSrc && (
            <S.CharacterImage
              src={leftImageSrc}
              alt={leftSpeakerName}
              $isActive={activeSpeakerName === leftSpeakerName}
              $position="left"
            />
          )}
          {rightImageSrc && (
            <S.CharacterImage
              src={rightImageSrc}
              alt={rightSpeakerName}
              $isActive={activeSpeakerName === rightSpeakerName}
              $position="right"
            />
          )}
        </S.TopCharactersContainer>

        {/* Caixa de diálogo na parte inferior */}
        <S.DialogueBox>
          <S.SpeakerNameBox>
            {currentDialogue.speaker}
          </S.SpeakerNameBox>

          <S.DialogueText>
            {currentDialogue.content}
          </S.DialogueText>

          {showAdvanceButton && (
            <S.AdvanceButton onClick={handleAdvance}>
              {currentIndex < dialogues.length - 1 ? 'Avançar' : 'Finalizar'}
            </S.AdvanceButton>
          )}
        </S.DialogueBox>
      </S.CutsceneContainer>
    </S.CutsceneOverlay>
  );
};

export default Cutscene;
