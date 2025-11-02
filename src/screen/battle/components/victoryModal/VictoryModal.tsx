import React from 'react';
import * as S from './VictoryModal.styles';

interface VictoryModalProps {
  onContinue: () => void;
  onReturnToHub: () => void;
}

const VictoryModal: React.FC<VictoryModalProps> = ({
  onContinue,
  onReturnToHub,
}) => {
  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.ModalHeader>
          <S.VictoryIcon>🏆</S.VictoryIcon>
          <S.VictoryTitle>VITÓRIA!</S.VictoryTitle>
        </S.ModalHeader>

        <S.ModalContent>
          <S.VictoryMessage>
            Você derrotou o monstro com sucesso!
          </S.VictoryMessage>
          <S.QuestionText>
            O que deseja fazer agora?
          </S.QuestionText>
        </S.ModalContent>

        <S.ButtonContainer>
          <S.ActionButton $variant="continue" onClick={onContinue}>
            ⚔️ Continuar Batalha
          </S.ActionButton>
          <S.ActionButton $variant="return" onClick={onReturnToHub}>
            🏠 Voltar ao Hub
          </S.ActionButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default VictoryModal;
