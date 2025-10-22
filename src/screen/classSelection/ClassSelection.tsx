import React from 'react';
import ClassCardGrid from './components/ClassCardGrid'; 
import ClassDetailPanel from './components/ClassDetailPanel'; 
import { ClassLogic } from '../../hooks/class/ClassLogic';
import * as S from './Class.styles';
import { type ClassName } from '../../types/Character';

const ClassSelectionScreen: React.FC = () => {
  const {
    classes,
    isLoadingClasses,
    error,
    selectedClass,
    handleClassClick,
    handleConfirmSelection,
    handleCancelSelection,
  } = ClassLogic();

  // Renderização dos estados de loading e erro
  const renderLoadingState = () => (
    <S.LoadingContainer>
      <S.LoadingSpinner>⚔️</S.LoadingSpinner>
      <S.LoadingText>Carregando heróis...</S.LoadingText>
    </S.LoadingContainer>
  );

  const renderErrorState = () => (
    <S.ErrorContainer>
      <S.ErrorIcon>⚠️</S.ErrorIcon>
      <S.ErrorText>{error}</S.ErrorText>
      <S.RetryButton onClick={() => window.location.reload()}>
        🔄 Tentar Novamente
      </S.RetryButton>
    </S.ErrorContainer>
  );

  // Função para renderizar o conteúdo principal
  const renderContent = () => {
    if (isLoadingClasses) {
      return renderLoadingState();
    }

    if (error) {
      return renderErrorState();
    }

    if (!classes || classes.length === 0) {
      return (
        <S.EmptyStateContainer>
          <S.EmptyStateIcon>🏰</S.EmptyStateIcon>
          <S.EmptyStateText>Nenhum herói disponível</S.EmptyStateText>
        </S.EmptyStateContainer>
      );
    }

    return (
      <ClassCardGrid
        classes={classes}
        selectedClassName={selectedClass?.name as ClassName || null}
        onClassClick={handleClassClick}
      />
    );
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>ESCOLHA SUA CLASSE</S.Title>
        <S.Subtitle>
          Cada classe possui habilidades únicas que definirão sua jornada
        </S.Subtitle>
      </S.Header>
      
      <S.ContentWrapper>
        <S.ClassGridContainer>
          {renderContent()}
        </S.ClassGridContainer>

        <S.DetailPanelContainer>
          <ClassDetailPanel 
            selectedClass={selectedClass} 
            onConfirm={handleConfirmSelection} 
            onCancel={handleCancelSelection} 
          />
        </S.DetailPanelContainer>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default ClassSelectionScreen;

