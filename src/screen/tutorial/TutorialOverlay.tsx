import React, { useState, useEffect } from 'react';
import * as S from './Tutorial.styles'; // (Ou PixelDialogueOverlay.styles)

// <<< MUDANÇA AQUI >>>
// Importa a interface correta do seu novo arquivo de tipos
import type { DialogueLine } from '../../types'; // Ajuste o caminho se necessário

export interface CharacterImages {
  [key: string]: string | undefined;
}
// -----------------------------------------------------------------------------------

interface TutorialOverlayProps {
  dialogueData: DialogueLine[]; // Agora usa a nova interface
  currentDialogueIndex: number;
  onAdvanceDialogue: () => void;
  characterImages: CharacterImages;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
  dialogueData,
  currentDialogueIndex,
  characterImages,
  onAdvanceDialogue,
}) => {
  if (!dialogueData || dialogueData.length === 0) {
    return null; 
  }

  const [showAdvanceButton, setShowAdvanceButton] = useState(false);

  const currentLine = dialogueData[currentDialogueIndex];

  const activeSpeakerName = currentLine?.speaker?.name;

  const speakerNames = Object.keys(characterImages);
  const leftSpeakerName = speakerNames[0]; 
  const rightSpeakerName = speakerNames[1]; 

  const leftImageSrc = characterImages[leftSpeakerName];
  const rightImageSrc = characterImages[rightSpeakerName];

  useEffect(() => {
    const buttonShowDelay = 500; 

    const buttonTimer = setTimeout(() => {
      setShowAdvanceButton(true);
    }, buttonShowDelay);

    return () => {
      clearTimeout(buttonTimer);
      setShowAdvanceButton(false);
    };
  }, [currentDialogueIndex]); 

  const handleManualAdvance = () => {
    onAdvanceDialogue();
  };

  return (
    <S.DialogueOverlay>
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
          {currentLine.speaker.name}
        </S.SpeakerNameBox>

        <S.DialogueText>
          {currentLine.content}
        </S.DialogueText>

        {showAdvanceButton && (
          <S.AdvanceButton onClick={handleManualAdvance}>
            Avançar
          </S.AdvanceButton>
        )}
      </S.DialogueBox>
    </S.DialogueOverlay>
  );
};

export default TutorialOverlay;